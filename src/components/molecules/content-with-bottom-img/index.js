const ContentWithBottomImg = ({
  text,
  image
}) => {
  return (
      <div className="content-container">
        <div className="">
            <p className='post-text'>
                {text}
            </p>
        </div>
        <div className='post-image'>
            <img className='img' src={image}></img>
        </div>
      </div>

  )
}

export default ContentWithBottomImg
