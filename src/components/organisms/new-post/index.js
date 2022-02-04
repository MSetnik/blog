import './index.css'
import logo2 from '../../../static/svg-logo-2.svg'
import { useContext, useEffect, useState } from 'react'

// Firebase
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase-init'

// Components
import AddParagraf from '../../molecules/add-paragraf'
import { StoreContext } from '../../../store/reducer'

const NewPost = () => {
  const store = useContext(StoreContext)
  const state = store.state
  const dispatch = store.dispatch

  const [paragrafCount, setParagrafCount] = useState(1)
  const [headerImage, setHeaderImage] = useState()
  const [title, setTItle] = useState()
  const [summary, setSummary] = useState()

  const addParagraf = () => {
    setParagrafCount(paragrafCount + 1)
  }

  const children = []

  for (let i = 0; i < paragrafCount; i += 1) {
    children.push(<AddParagraf key={i} index={i} />)
  };

  const savePost = async () => {
    const postData = {
      date: new Date(),
      image: headerImage,
      summary: summary,
      title: title
    }

    console.log(state.paragrafs)
    console.log(postData)

    // Add a new document with a generated id.
    const postContentRef = await addDoc(collection(db, 'post-content'), {
      content: state.paragrafs
    })
    console.log('Document written with ID: ', postContentRef.id)

    // Add a new document with a generated id.
    const postRef = await setDoc(doc(db, 'post', postContentRef.id), postData)
    console.log('Document written with ID: ', postContentRef.id)
  }

  return (
    <div className="new-post-content">
        <div className='home-image'>
            <img src={logo2} className='logo-img'/>
        </div>

        <div className="form-group header-post-img">
            <div className='form-group post-data'>
                <label htmlFor="exampleFormControlInput1">Naslovna slika</label>
                <input onChange={(e) => setHeaderImage(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder='http:// ...'/>
            </div>

            <div className="form-group post-data">
                <label htmlFor="exampleFormControlInput1">Naslov</label>
                <input onChange={(e) => setTItle(e.target.value)} className="form-control" id="exampleFormControlInput1" />
            </div>

            <div className="form-group post-data">
                <label htmlFor="exampleFormControlInput1">Sažetak</label>
                <textarea onChange={(e) => setSummary(e.target.value)} className="form-control" id="exampleFormControlInput1" rows="2" />
            </div>

        </div>

        {children}

        <div id="add-post-div">
            <input onClick={() => addParagraf()} id="add-paragraf-btn" type="button" value="Novi paragraf"/>
            <input data-bs-toggle="modal" data-bs-target="#myModal" id="save-post-btn" type="button" value="Završi"/>
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
                    <button onClick={() => savePost()} type="button" data-bs-dismiss="modal" className="btn btn-primary">Potvrdi i nastavi</button>
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

export default NewPost
