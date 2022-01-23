import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './App.css'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

// components
import Home from './scenes/home'
import Navbar from './components/organisms/navbar'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/blog" element={<Home />} />
        {/* <Route path="expenses" element={<Home />} /> */}
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
