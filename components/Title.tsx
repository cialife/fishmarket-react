type TitleProps = {
    title: string;
    // Opsional
    sub?: string;
    id?: string;
}

export default function Title({title, sub, id}: TitleProps) {
    return (
        <div className="title mb-3" id={id}>
            <h2>{title}</h2>
            {sub && <p>{sub}</p>}
        </div>
    )
}