import './index.css'

// Components
import PostCard from '../../components/organisms/post-card'

const Home = () => {
  return (
      <div className="container">
      <div className="main-col">
        <h1 className='home-title'>
          LIJEPA I ZDRAVA
        </h1>
        <div className="row row-cols-auto">
          <PostCard className='col' color='rgba(102, 189, 22, 0.2)' onClick={() => history.push('/nasm') }/>
          <PostCard className='col' color='rgba(212, 31, 125, 0.2)'/>
          <PostCard className='col' color='rgba(251, 222, 201, 0.2)'/>
          <PostCard className='col' color='rgba(221, 221, 122, 0.2)'/>
          <PostCard className='col' color='rgba(42, 16, 13, 0.2)'/>
          <PostCard className='col' color='rgba(122, 51, 156, 0.2)'/>
        </div>
      </div>
    </div>
  )
}

export default Home
