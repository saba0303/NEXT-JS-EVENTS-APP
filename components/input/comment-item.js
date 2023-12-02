export default function Comment(props) {
    const { name, text } = props.comment
    return <>
        <p>{text}</p>
        <div>
            By <address>{name}</address>
        </div>
    </>
}

