import './index.css'
import { useEffect, useState } from 'react'

// Components
import PostCard from '../../components/organisms/post-card'
import { Link } from 'react-router-dom'
import logo2 from '../../static/svg-logo-2.svg'

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase-init'
import Login from '../../components/organisms/login'
import NewPost from '../../components/organisms/new-post'

const Admin = () => {
  const [posts, setPosts] = useState([])
  const [logginSuccess, setLoginSuccess] = useState(null)

  const login = async (username, password) => {
    const lPosts = []

    try {
      const querySnapshot = await getDocs(collection(db, 'admin'))
      const col = collection(db, 'admin')
      const q = query(col, where('username', '==', username), where('password', '==', password))
      const querySnapshots = await getDocs(q)
      querySnapshots.forEach((doc) => {
        if (!doc.data()) {
          setLoginSuccess(false)
          return
        }

        // const user = {
        //   id: doc.id,
        //   username: doc.data().title,
        //   password: doc.data().image
        // }

        setLoginSuccess(true)
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setPosts(lPosts)
  }

  return (
    <div className="container admin-container">
      <div className="main-col">
          {
              (!logginSuccess || logginSuccess === null)
                ? <Login onClick={login}/>
                : <NewPost />
          }

      </div>

    </div>
  )
}

export default Admin
