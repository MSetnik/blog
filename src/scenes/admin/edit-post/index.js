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
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { actions, createAction } from '../../../store/actions'

const AdminEditPost = () => {
  const store = useContext(StoreContext)
  const state = store.state
  const dispatch = store.dispatch

  const { pathname } = useLocation()
  const postId = useParams().id

  const navigate = useNavigate()

  const [paragrafCount, setParagrafCount] = useState(1)
  const [headerImage, setHeaderImage] = useState()
  const [title, setTItle] = useState()
  const [summary, setSummary] = useState()

  const [post, setPost] = useState({ image: '', summary: '', date: '', title: '' })
  const [postContent, setPostContent] = useState([])

  const [childrenParagrafs, setChildrenParagrafs] = useState([])

  const children = []

  useEffect(() => {
    if (!state.userLoggedIn) {
      navigate('/admin')
    } else {
      getPostData()
      getPostContent()
    }
  }, [])

  const addParagraf = () => {
    children.push(<AddParagraf/>)
  }

  if (postContent.length !== 0) {
    postContent.forEach((content, i) => {
      children.push(<AddParagraf
              index={i}
              paragrafType={content.type}
              paragrafImage={content.image}
              paragrafSubtitle={content.subtitle}
              paragrafText={content.text}
          />
      )
    })
  }

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
      content: state.paragrafs
    })

    // // Add a new document with a generated id.
    // const postContentRef = await addDoc(collection(db, 'post-content'), {
    //   content: state.paragrafs
    // })
    // console.log('Document written with ID: ', postContentRef.id)

    // // Add a new document with a generated id.
    // const postRef = await setDoc(doc(db, 'post', postContentRef.id), postData)
    // console.log('Document written with ID: ', postContentRef.id)

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
          setPostContent(doc.data().content)
        }
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div className="new-post-content container">
        <div className='edit-post-image'>
            <img src={logo2} className='edit-logo-img'/>
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

        <h2>
            <strong>
                *Obavezno spremiti sve paragrafe*
            </strong>
        </h2>

        {children}

        <div className='edit-post-btns'>
            <input data-bs-toggle="modal" data-bs-target="#deletePostModal" id="save-post-btn" className='delete-post-btn' type="button" value="Obriši post"/>

            <div id="add-post-div">
                {/* <input onClick={() => addParagraf()} id="add-paragraf-btn" type="button" value="Novi paragraf"/> */}
                <input data-bs-toggle="modal" data-bs-target="#myModal" id="save-post-btn" type="button" value="Završi"/>
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
                    <p>Provjerite jeste li spremili sve paragrafe.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Zatvori i provjeri</button>
                    <button onClick={() => updatePost()} type="button" data-bs-dismiss="modal" className="btn btn-primary">Potvrdi i nastavi</button>
                </div>
                </div>
            </div>
        </div>

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

        {/* <div className="row row-cols-1 main-grid" >
            <div id="add-post-div">
                <input id="add-post-btn" type="button" value="Dodaj paragraf"/>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Tip paragrafa</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Image link</label>
                    <input disabled={parseInt(type) !== 2} className="form-control" id="exampleFormControlInput1" placeholder="url"/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Podnaslov</label>
                    <textarea disabled={parseInt(type) !== 1} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Text</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="25"></textarea>
                </div>
            </form>
        </div> */}
    </div>
  )
}

export default AdminEditPost
