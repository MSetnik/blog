/* eslint-disable multiline-ternary */
import { useState, useEffect, useContext } from 'react'
import { actions, createAction } from '../../../store/actions'

// reducer
import { StoreContext } from '../../../store/reducer'

const AddParagraf = ({
  index,
  paragrafType = 1,
  paragrafImage = '',
  paragrafSubtitle = '',
  paragrafText = ''
}) => {
  const store = useContext(StoreContext)
  const state = store.state
  const dispatch = store.dispatch

  const lParagrafs = state.paragrafs

  const [type, setType] = useState(paragrafType)
  const [image, setImage] = useState(paragrafImage)
  const [subtitle, setSubtitle] = useState(paragrafSubtitle)
  const [text, setText] = useState(paragrafText)
  const [isSaved, setIsSaved] = useState(false)

  const saveParagraf = () => {
    const paragraf = {
      type,
      image,
      subtitle,
      text
    }

    lParagrafs.push(paragraf)

    dispatch(createAction(actions.ADD_PARAGRAF, lParagrafs))
  }

  return (
    <div className="row row-cols-1 paragraf-form" >
        <div id="add-post-div">

            <input
             onClick={() => {
               //    getData(type, image, subtitle, text)
               saveParagraf()
               setIsSaved(true)
             }}
            id="add-post-btn"
            type="button"
            value="Spremi"
            disabled={isSaved}
            />

        </div>
        <fieldset disabled={isSaved} >
            <form>
                <div className="form-group post-data">
                    <label htmlFor="exampleFormControlSelect1">Tip paragrafa</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                        <option value={1}>Podnaslov i text</option>
                        <option value={2}>Text i slika</option>
                        <option value={3}>Text</option>
                    </select>
                </div>

                <div className="form-group post-data">
                    <label htmlFor="exampleFormControlTextarea1">Podnaslov</label>
                    <textarea onChange={(e) => setSubtitle(e.target.value)} disabled={parseInt(type) !== 1} className="form-control" id="exampleFormControlTextarea1" rows="1" value={subtitle}></textarea>
                </div>

                <div className="form-group post-data">
                    <label htmlFor="exampleFormControlTextarea1">Text</label>
                    <textarea onChange={(e) => setText(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="25" value={text}></textarea>
                </div>

                <div className="form-group post-data">
                    <label htmlFor="exampleFormControlInput1">Image link</label>
                    <input disabled={parseInt(type) !== 2} onChange={(e) => setImage(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder='http:// ...' value={image}/>
                </div>

            </form>
        </fieldset>

        <hr className='paragraf-spacing'/>
    </div>
  )
}

export default AddParagraf
