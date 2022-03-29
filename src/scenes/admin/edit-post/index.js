import './index.css'
import logo2 from '../../../static/admin.png'
import { useContext, useEffect, useState } from 'react'

// Firebase
import { collection, addDoc, setDoc, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../firebase-init'

// Components
import AddParagraf from '../../../components/molecules/add-paragraf'

// Store
import { StoreContext } from '../../../store/reducer'

// url params
import { useNavigate, useParams } from 'react-router-dom'
import { actions, createAction } from '../../../store/actions'
import Editor from '../../../components/organisms/editor'

const AdminEditPost = () => {
  const [postText, setPostText] = useState('')
  const [headerImage, setHeaderImage] = useState()
  const [title, setTItle] = useState()
  const [summary, setSummary] = useState()

  const store = useContext(StoreContext)
  const state = store.state
  const dispatch = store.dispatch

  const postId = useParams().id

  const navigate = useNavigate()

  useEffect(() => {
    if (!state.userLoggedIn) {
      navigate('/admin')
    } else {
      getPostData()
      getPostContent()
    }
  }, [])

  const updatePost = async () => {
    const postData = {
      date: new Date(),
      image: headerImage,
      summary: summary,
      title: title
    }

    const docRef = doc(db, 'post', postId)

    await updateDoc(docRef, {
      image: headerImage,
      summary: summary,
      title: title
    })

    const contentRef = doc(db, 'post-content', postId)

    await updateDoc(contentRef, {
      content: postText
    })

    dispatch(createAction(actions.CLEAR_PARAGRAFS, []))

    navigate('/admin/home')
  }

  const deletePost = async () => {
    await deleteDoc(doc(db, 'post', postId))
    await deleteDoc(doc(db, 'post-content', postId))

    navigate('/admin/home')
  }

  const getPostData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'post'))
      querySnapshot.forEach((doc) => {
        if (doc.id === postId) {
          const post = {
            id: doc.id,
            title: doc.data().title,
            image: doc.data().image,
            summary: doc.data().summary
          }

          setTItle(doc.data().title)
          setHeaderImage(doc.data().image)
          setSummary(doc.data().summary)
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
          setPostText(doc.data().content)
        }
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div className="new-post-content container">

        <div className='edit-post-btns'>
            <input data-bs-toggle="modal" data-bs-target="#deletePostModal" id="save-post-btn" className='delete-post-btn' type="button" value="Obriši post"/>

            <div id="add-post-div">
                <input data-bs-toggle="modal" data-bs-target="#myModal" id="save-post-btn" type="button" value="Spremi"/>
            </div>

        </div>

        <div className="form-group header-post-img">
            <div className='form-group post-data'>
                <label htmlFor="exampleFormControlInput1">Naslovna slika</label>
                <input onChange={(e) => setHeaderImage(e.target.value)} className="form-control image-src-input" id="exampleFormControlInput1" placeholder='http:// ...' value={headerImage}/>
            </div>

            <div className="form-group post-data">
                <label htmlFor="exampleFormControlInput1">Naslov</label>
                <input onChange={(e) => setTItle(e.target.value)} className="form-control" id="exampleFormControlInput1" value={title}/>
            </div>

            <div className="form-group post-data">
                <label htmlFor="exampleFormControlInput1">Sažetak</label>
                <textarea onChange={(e) => setSummary(e.target.value)} className="form-control" id="exampleFormControlInput1" rows="4" value={summary}/>
            </div>

        </div>

        <div>
            <Editor
                value={postText}
                setValue={setPostText}
            />
        </div>

        {/* Modali */}
        <div className="modal" tabIndex="-1" id='deletePostModal'>
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Upozorenje!</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Jeste li sigurni da želite obrisati odabrani post?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Prekid</button>
                    <button onClick={() => deletePost()} type="button" data-bs-dismiss="modal" className="btn btn-danger">Potvrdi i obriši</button>
                </div>
                </div>
            </div>
        </div>

        <div className="modal" tabIndex="-1" id='myModal'>
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Upozorenje!</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Spremi promjene?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Ne</button>
                    <button onClick={() => updatePost()} type="button" data-bs-dismiss="modal" className="btn btn-primary">Da</button>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AdminEditPost
