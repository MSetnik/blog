import { useReducer } from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// components
import Home from './scenes/home'
import Navbar from './components/organisms/navbar'
import Post from './scenes/post'
import Admin from './scenes/admin'

// Reducers
import { initialState } from './store/initial-state'
import { reducer, StoreContext } from './store/reducer'
import { actions, createAction } from './store/actions'
import AdminHome from './scenes/admin/home'
import AdminEditPost from './scenes/admin/edit-post'
import NewPost from './components/organisms/new-post'

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ dispatch, state }}>
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/edit-post/:id" element={<AdminEditPost />} />
                <Route path="/admin/new-post" element={<NewPost />} />
            </Routes>
        </BrowserRouter>
    </StoreContext.Provider>
  )
}

export default App
