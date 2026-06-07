interface Props {
    title: string;
    children: React.ReactNode;
}

export default function Card({
    title,
    children,
}: Props) {
    return (
        <div className="rk-card">
            <h3>{title}</h3>
            {children}
        </div>
    );
}