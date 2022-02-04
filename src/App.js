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
            </Routes>
        </BrowserRouter>
    </StoreContext.Provider>
  )
}

export default App
