import './index.css'
import { useEffect, useState } from 'react'

// Components
import PostCard from '../../components/organisms/post-card'
import ContentWithTitle from '../../components/molecules/content-with-title'
import Content from '../../components/molecules/content'

// Router
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import ContentWithBottomImg from '../../components/molecules/content-with-bottom-img'

//  firestore
import { collection, getDoc, getDocs, doc } from 'firebase/firestore'
import { db, firebase } from '../../firebase-init'

// Animations
import { motion } from 'framer-motion'

const Post = ({
  title = '19 Healthy Lifestyle Habits That Dont Break Your Wallet',
  image
}) => {
  const [postContent, setPostContent] = useState([])
  const [post, setPost] = useState([])
  const { pathname } = useLocation()
  const postId = useParams().id

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    getPostData()
    getPostContent()
  }, [])

  const getPostData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'post'))
      querySnapshot.forEach((doc) => {
        if (doc.id === postId) {
          const post = {
            id: doc.id,
            title: doc.data().title,
            image: doc.data().image,
            sumamry: doc.data().summary
          }

          setPost(post)
        }
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const getPostContent = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'post-content'))
      querySnapshot.forEach((doc) => {
        if (postId === doc.id) {
          setPostContent(doc.data().content)
        }
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }

    // setPostContent(postContent)
  }

  // console.log(typeof postContent)
  // console.log(postContent)

  const showContentOnType = (content) => {
    switch (parseInt(content.type)) {
      // Text and subtitle
      case 1:
        return (
            <ContentWithTitle
              title={content.title}
              text={content.text}
            />
        )

      case 2:
        return (
            <ContentWithBottomImg
              image={content.image}
              text={content.text}
            />
        )

      case 3:
        return (
            <Content
              text={content.text}
            />
        )
    }
  }

  return (
    <div className="container post">
      <motion.div animate={{
        y: 0,
        transition: { from: -100, duration: 1 }
      }} className='header-img' style={{ backgroundImage: `url( ${post.image})` }}>
      </motion.div>
      <motion.div
        whileInView={{
          y: 0,
          transition: { from: 100, duration: 1 }
        }} className="main-col single-post-col">
        <h1 className='post-title'>
          {post.title}
        </h1>
        {
          postContent.map((content, index) => {
            console.log(content)
            if (parseInt(content.type) === 1) {
              return (
                    <ContentWithTitle
                      key={index}
                      title={content.subtitle}
                      text={content.text}
                    />
              )
            }
            if (parseInt(content.type) === 2) {
              return (
                    <ContentWithBottomImg
                      key={index}
                      image={content.image}
                      text={content.text}
                    />
              )
            }
            if (parseInt(content.type) === 3) {
              return (
                  <Content
                    key={index}
                    text={content.text}
                  />
              )
            }

            return null
          })
        }

      </motion.div>
    </div>
  )
}

export default Post
