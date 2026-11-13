export default function StatCard({
    title,
    value,
    icon: Icon,
    color
}) {

    return (
        <div className="stat-card">

            <div>
                <p>{title}</p>
                <h2>{value ?? 0}</h2>
            </div>

            <div
                className="stat-icon"
                style={{ color }}
            >
                <Icon size={25} />
            </div>

        </div>
    );
}