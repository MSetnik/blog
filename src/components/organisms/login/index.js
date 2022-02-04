import './index.css'

import loginImg from '../../../static/login.png'
import { useState } from 'react'

const Login = ({
  onClick
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {/* <!-- Tabs Titles --> */}

                {/* <!-- Icon --> */}
                <div className="fadeIn first img-div">
                    <img src={loginImg} id="icon" alt="User Icon" />
                </div>

                {/* <!-- Login Form --> */}
                <form className='login-form'>
                    <input onChange={(e) => setUsername(e.target.value)} type="text" id="login" className="fadeIn second" placeholder="login"/>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" id="password" className="fadeIn third" placeholder="password"/>
                    <input onClick={() => onClick(username, password)} id="login-btn" type="button" className="fadeIn fourth" value="Log In"/>
                </form>
            </div>
        </div>
  )
}

export default Login
