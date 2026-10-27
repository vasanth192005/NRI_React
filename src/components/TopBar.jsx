import Icon from './Icon';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="wrap topbar__in">
        <p className="topbar__left">
          <span className="dot"></span>Cross-Border Legal Advisory Active:{' '}
          <a href="#contact">Tamilnadu ,Bangalore NRI Desks</a>
        </p>
        <p className="topbar__right">
          <span><Icon name="clock" size={15} />24–48 Hr Document Turnaround</span>
          <span><Icon name="shield" size={15} />Bar Council &amp; CA Certified</span>
        </p>
      </div>
    </div>
  );
}
