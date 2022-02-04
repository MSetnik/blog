const ContentWithTitle = ({
  title,
  text
}) => {
  return (
    <div className="content-container ">
        <h4 className="post-subtitle">{title}</h4>
        <p className='post-text'>
            {text}
        </p>
    </div>
  )
}

export default ContentWithTitle
