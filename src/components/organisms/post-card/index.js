import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

// Animations
import { motion } from 'framer-motion'
import { isVisible } from '@testing-library/user-event/dist/utils'

const PostCard = ({
  color = 'rgba(102, 51, 153, 0.2)',
  id = 1,
  img = 'https://www.boomfit.com/img/leoblog/b/1/22/lg-b-artigo%20apps.jpg',
  title = 'Fitness zdravlje',
  sumamry,
  admin = false,
  isVisible
}) => {
  return (
    <Link className={'container post-navigation post-container'} to={ !admin ? `/post/${id}` : `/admin/edit-post/${id}`}>
      <motion.div
          whileInView={{
            opacity: 1,
            transition: { from: 0, duration: 1 }
          }}>
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
      </motion.div>
    </Link>

  )
}

export default PostCard
