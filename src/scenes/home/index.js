import './index.css'
import { useEffect, useState } from 'react'

// Components
import PostCard from '../../components/organisms/post-card'
import { Link } from 'react-router-dom'
import logo2 from '../../static/svg-logo-2.svg'

import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-init'

// Animations
import { motion } from 'framer-motion'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const lPosts = []

    try {
      const querySnapshot = await getDocs(collection(db, 'post'))
      querySnapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          sumamry: doc.data().summary,
          date: doc.data().date
        }

        lPosts.push(post)
        lPosts.sort((a, b) => b.date - a.date)
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setPosts(lPosts)
  }

  return (
    <div className="container">
      <div className="main-col">
        <div className='home-image'>
          <img src={logo2} className='logo-img'/>
        </div>
        <div className="row row-cols-3 main-grid" >

          {
            posts.map((p, index) => (
              <PostCard
                className='col'
                id={p.id}
                key={index}
                img={p.image}
                title={p.title}
                sumamry={p.sumamry}
                admin={false}

              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home
