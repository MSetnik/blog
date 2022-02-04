import { Link } from 'react-router-dom'
import './index.css'

const PostCard = ({
  color = 'rgba(102, 51, 153, 0.2)',
  id = 1,
  img = 'https://www.boomfit.com/img/leoblog/b/1/22/lg-b-artigo%20apps.jpg',
  title = 'Fitness zdravlje',
  sumamry
}) => {
  return (
    <Link className='container post-navigation post-container' to={`/post/${id}`}>
        <div className='post-img-container'>
            <img className='post-img' src={img} alt="Italian Trulli"/>
        </div>
        <div className='post-content-container'>
            <h1 className='post-card-title'>{title}</h1>

            <div className='post-text-container'>
                <p className='post-card-text'>
                  {sumamry}
                </p>
            </div>
        </div>
    </Link>

  )
}

export default PostCard
