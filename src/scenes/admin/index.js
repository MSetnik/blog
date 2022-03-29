import './index.css'
import { useContext, useEffect, useState } from 'react'

// Components
import PostCard from '../../components/organisms/post-card'
import { Link, useNavigate } from 'react-router-dom'
import logo2 from '../../static/svg-logo-2.svg'

import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase-init'
import Login from '../../components/organisms/login'
import NewPost from './new-post'
import AdminHome from './home'

// Store
import { StoreContext, reducer } from '../../store/reducer'
import { actions, createAction } from '../../store/actions'

const Admin = () => {
  const store = useContext(StoreContext)
  const state = store.state
  const dispatch = store.dispatch

  const [posts, setPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      if (state.userLoggedIn) {
        navigate('/admin/home')
      }
    }

    return () => { isMounted = false }
  }, [])

  const login = async (username, password) => {
    const lPosts = []

    try {
      const col = collection(db, 'admin')
      const q = query(col, where('username', '==', username), where('password', '==', password))
      const querySnapshots = await getDocs(q)
      querySnapshots.forEach((doc) => {
        if (!doc.data()) {
          return
        }

        dispatch(createAction(actions.USER_LOGIN, true))
        navigate('/admin/home')
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setPosts(lPosts)
  }

  return (
    <div className="container admin-container">
      <div className="main-col">
          <Login onClick={login}/>
      </div>

    </div>
  )
}

export default Admin
