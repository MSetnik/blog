import './index.css'
import { useContext, useEffect, useState } from 'react'

// Assets
import logo2 from '../../../static/admin.png'

// Components
import PostCard from '../../../components/organisms/post-card'
import { Link, useNavigate } from 'react-router-dom'

import { collection, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase-init'

// Store
import { StoreContext } from '../../../store/reducer'

const AdminHome = () => {
  const store = useContext(StoreContext)
  const state = store.state
  const dispatch = store.dispatch

  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      if (!state.userLoggedIn) {
        navigate('/admin')
      } else {
        getData()
      }
    }

    return () => { isMounted = false }
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
          sumamry: doc.data().summary
        }

        lPosts.sort((a, b) => b.date - a.date)
        lPosts.push(post)
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    setPosts(lPosts)
  }

  return (
    <div className="container">
      <div className="main-col">
        <div className='edit-post-image'>
            <img src={logo2} className='edit-logo-img'/>
        </div>

        <div className='new-post-btn-div row row-cols-auto main-grid'>
            <input onClick={() => navigate('/admin/new-post') } id="save-post-btn" type="button" value="Novi post"/>
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
                    admin={true}
                />
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default AdminHome
