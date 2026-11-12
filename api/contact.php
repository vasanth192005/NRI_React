<?php
// JSON contact endpoint for the React form (replaces submit.php)
session_start();
require __DIR__ . '/config.php';
header( 'Content-Type: application/json; charset=utf-8' );
header( 'X-Content-Type-Options: nosniff' );

function out( $code, $ok, $status ) {
	http_response_code( $code );
	echo json_encode( array( 'ok' => $ok, 'status' => $status ) );
	exit;
}

if ( $_SERVER['REQUEST_METHOD'] !== 'POST' ) { out( 405, false, 'error' ); }

// Same-site check (Origin or Referer host must be allowed)
$src  = $_SERVER['HTTP_ORIGIN'] ?? ( $_SERVER['HTTP_REFERER'] ?? '' );
$host = parse_url( $src, PHP_URL_HOST );
$allowed = array_map( 'trim', explode( ',', NRI_ALLOWED_HOSTS ) );
if ( $host && ! in_array( strtolower( $host ), $allowed, true ) && ! in_array( $host, array( 'localhost', '127.0.0.1' ), true ) ) {
	out( 403, false, 'error' );
}

$in = json_decode( file_get_contents( 'php://input' ), true );
if ( ! is_array( $in ) ) { out( 400, false, 'error' ); }

// Honeypot: pretend success so bots don't retry
if ( ! empty( $in['website'] ) ) { out( 200, true, 'sent' ); }

function clean( $in, $k ) {
	return trim( preg_replace( '/[\r\n]+/', ' ', strip_tags( (string) ( $in[ $k ] ?? '' ) ) ) );
}
$name = clean( $in, 'name' ); $phone = clean( $in, 'phone' ); $country = clean( $in, 'country' );
$city = clean( $in, 'city' ); $service = clean( $in, 'service' );
$email = filter_var( trim( (string) ( $in['email'] ?? '' ) ), FILTER_VALIDATE_EMAIL );
$desc  = trim( strip_tags( (string) ( $in['description'] ?? '' ) ) );
if ( ! $name || ! $email || ! $phone || ! $country || ! $desc ) { out( 422, false, 'invalid' ); }

// Rate limit: one enquiry per 30 seconds per session
if ( ! empty( $_SESSION['last'] ) && time() - $_SESSION['last'] < 30 ) { out( 429, false, 'error' ); }

$body = "Name: $name\nEmail: $email\nPhone: $phone\nCountry of residence: $country\nCity in India: $city\nService: $service\n\nRequirement:\n$desc\n";
$headers = 'From: ' . NRI_SITE_NAME . ' <' . NRI_FROM . ">\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";
$ok = mail( NRI_EMAIL, '=?UTF-8?B?' . base64_encode( "New NRI enquiry: $service" ) . '?=', $body, $headers );
if ( $ok ) { $_SESSION['last'] = time(); }
out( $ok ? 200 : 500, (bool) $ok, $ok ? 'sent' : 'error' );
