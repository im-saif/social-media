import React from 'react'
import './css/login.css'
import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import username from './imgs/login stuff/username.png'
import focusUsername from './imgs/login stuff/focus-username.png'
import password from './imgs/login stuff/password.png'
import focusPassword from './imgs/login stuff/focus-password.png'
import show from './imgs/login stuff/show.png'
import { DataContext } from '../DataContext'


const Login = () => {

  document.title = "Login"
  
  const [usernamefocus, setUsernameFocus] = useState(false)
  const [passwordfocus, setPasswordFocus] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const url = "https://6124fb4ec334850017459065.mockapi.io/users"
  const usernameRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const [registered, setRegistered] = useContext(DataContext)

  const getData = async(url) =>{
    const res = await fetch(url)
    let data = await res.json()
    setUsers(data)
  }

  useEffect(()=>{
    getData(url)
  },[])

  const handleLogin = (e) =>{
    e.preventDefault()
    const usernameValue = usernameRef.current.value.trim()
    const passwordValue = passwordRef.current.value.trim()
    if (usernameValue === "" || passwordValue === ""){
      setError("Enter username and password!")
      return
    }
    users.map(user=>{
      if (user.username === usernameValue.toLowerCase()){
        if (user.password === passwordValue){
            localStorage.setItem("loggedIn",JSON.stringify(user))
            navigate('/explore')
            setError("")
            return true
        }
        setError("Password doesn't match username!")
        return
      }
      setError("Password doesn't match username!")
    })
    
  }

  if(error !== ""){
    setTimeout(() => {
      setError("")
    }, 5500);
  }

  if(registered){
    setTimeout(() => {
      setRegistered(false)
    }, 4000);
  }

  return (
    <div className='login-page'>
      {registered? <div className='registered-alert'><p className='registered-text-alert'> Now, Login to your account.</p></div> : ""}
        <div className="login-container">
            <h1 className='login-title'>Login</h1>
            <form className='login-form'>
                <img alt="" className='form-icon username-icon' src={usernamefocus? focusUsername : username}/>
                <label className='form-label'>Username</label><br/>
                <input autoFocus onBlur={()=> setUsernameFocus(false)} onFocus={()=> setUsernameFocus(true)} className='username form-input' type="text" placeholder={usernamefocus? "":"Username"} ref={usernameRef}></input><br/><br/>
                <img alt='' className='form-icon password-icon' src={passwordfocus? focusPassword: password}/>
                <label className='form-label'>Password</label><br/>
                <input onBlur={()=> setPasswordFocus(false)} onFocus={()=> setPasswordFocus(true)} className='password form-input' type={showPassword? "text":"password"} placeholder={passwordfocus? "":"Password"} ref={passwordRef}></input>
                <img src={show} alt="" className='show-password' onClick={()=>setshowPassword(!showPassword)}/><br/><br/><br/>
                <span className='error'>{error}</span>
                <button type='submit' onClick={handleLogin} className='login-button'>LOGIN</button>
                <br/><br/><br/>
                <hr id='line-1'/> <h6 id="or">or</h6> <hr id='line-2'/><br/><br/>
                <Link to="/register"><button className='create-button'>Create New Account</button></Link>
            </form>
            
        </div>
        <br/><br/><br/><br/><br/>
    </div>
  )
}

export default Login