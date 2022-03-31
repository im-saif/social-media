import React, { useState,useRef, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './css/register.css'
import username from './imgs/login stuff/username.png'
import focusUsername from './imgs/login stuff/focus-username.png'
import password from './imgs/login stuff/password.png'
import focusPassword from './imgs/login stuff/focus-password.png'
import show from './imgs/login stuff/show.png'
import one from './imgs/avatars/1.png'
import two from './imgs/avatars/2.png'
import three from './imgs/avatars/3.png'
import four from './imgs/avatars/4.png'
import five from './imgs/avatars/5.png'
import six from './imgs/avatars/6.png'
import seven from './imgs/avatars/7.png'
import eight from './imgs/avatars/8.png'
import nine from './imgs/avatars/9.png'
import { DataContext } from '../DataContext'

const Register = () => {

  document.title = "Create an Account"
  const defaultpic = "data:image/jpeg;base64,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"

  const [users, setUsers] = useState([])
  const [usernameArray, setUsernameArray] = useState([])
  const [usernamefocus, setUsernameFocus] = useState(false)
  const [passwordfocus, setPasswordFocus] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  const [passwordAlert, setpasswordAlert] = useState(false)
  const [error, setError] = useState(false)
  const [usernameAlert, setusernameAlert] = useState(false)
  const [takenError, setTakenError] = useState(false)
  const [nameError, setnameError] = useState(false)
  const [showChoosePP, setshowChoosePP] = useState(false)
  const imgs = [one, two, three, four, five, six, seven, eight, nine]
  const [chosenImg, setChosenImg] = useState(defaultpic)
  const [registered, setRegistered] = useContext(DataContext)

  const fnRef = useRef()
  const lnRef = useRef()
  const unRef = useRef()
  const pwRef = useRef()
  const navigate = useNavigate()
  const url = "https://6124fb4ec334850017459065.mockapi.io/users"

  const getData = async(url) =>{
    const res = await fetch(url)
    let data = await res.json()
    setUsers(data)
    setUsernameArray(data.map(user=>{return user.username}))
  }

  useEffect(()=>{
    getData(url)
  },[])

  const checkForNum = (pw) =>{
    let found = false
    for (let i = 0; i < pw.length; i++ ){
      if(!isNaN(pw[i])){
        if(pw[i] === " "){continue}
          else{found = true
          return true}
      }
    } if (found === false){
      return false
    }
  }

  const checkForLetters = (pw) =>{
    let found = false
    for (let i = 0; i < pw.length; i++){
      if((/[a-zA-Z]/).test(pw)){
        found = true
        return true
      }
      if (found === false){
        return false
      }
    }
  }

  const checkUsername = (un) =>{
    for (let i = 0; i< un.length; i++){
      
      if(!(/[a-zA-Z]/).test(un[i])){
        if(un[i] === "." || un[i] === "_" || !isNaN(un[i])){continue}
        return false
      }
    }
    if(un.length > 15){return false}
    if( un.length < 4 || un.includes(" ")){
      return false
    }
    else{
      return true
    }
  }

  const turnOff = (...args)=>{
    args.map(arg=>{
      arg(false)
    })
  }

  setTimeout(() => {
    turnOff(setnameError, setError, setTakenError, setpasswordAlert, setusernameAlert)
  }, 15000);

  const capitalize = (string) =>{
    let words = string.split(" ")
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ")
  }

  const handleRegister = (e) =>{
      e.preventDefault()
      const fnValue = capitalize(fnRef.current.value.trim())
      const lnValue = capitalize(lnRef.current.value.trim())
      const unValue = unRef.current.value.toLowerCase().trim()
      const pwValue = pwRef.current.value.trim()
      if(fnValue === "" || lnValue === "" || unValue === "" || pwValue === ""){
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 4000);
        return
      }

      if (checkForNum(fnValue) || checkForNum(lnValue)){
          setnameError(true)
          return
      }

      if(!(/[a-zA-Z]/).test(unValue[0])){
        setusernameAlert(true)
        return
      }

      if (checkUsername(unValue) === false){
        setusernameAlert(true)
        return
      }

      if(usernameArray.includes(unValue)){
        setTakenError(true)
        return
      }

      if(pwValue.length < 8){
        setpasswordAlert(true)
        return
      }
      if (checkForNum(pwValue) === false || checkForLetters(pwValue) === false){
        setpasswordAlert(true)
        return
      }
     
      const user = {
        first_name: fnValue, 
        last_name: lnValue,
        username: unValue,
        password: pwValue,
        image: chosenImg, 
        createdAt: new Date().toLocaleString().split(", ")[0]
      }
      fetch('https://6124fb4ec334850017459065.mockapi.io/users', {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
      }).then(()=>{
        setRegistered(true)
        navigate('/')
      })
  }

  return (
    <div className='register-page'>
      <div className="register-container">
        <h1 className='register-title'>Register</h1>
        <Link to="/"><p className='back-to-login'><p title="Back to Login" style={{"font-size":"30px"}}>⬅</p></p></Link>
        <img onClick={()=> setshowChoosePP(!showChoosePP)} src={chosenImg} className='p-pic' alt=""/> <span onClick={()=> setshowChoosePP(true)} className='change-avatar-register'>Change avatar</span>
        {showChoosePP? <div className="choose-pp">
              {imgs.map(img=>{
                return(<img onClick={()=> {setshowChoosePP(false); setChosenImg(img)}} src={img} alt="" className='avatar'/>)
              })}
        </div>:null}
        <form className='register-form'>
            <input required className='fn register-input' type="text" placeholder='First Name' ref={fnRef}></input>
            <input required className='ln register-input' type="text" placeholder='Last Name' ref={lnRef}></input>
            <img alt="" className='form-icon register-un-icon' src={usernamefocus? focusUsername : username}/>
            <input required onBlur={()=> setUsernameFocus(false)} onFocus={()=> setUsernameFocus(true)} className='un register-input' type="text" placeholder={usernamefocus? "":"Username"} ref={unRef} ></input>
            <img alt='' className='form-icon register-pw-icon' src={passwordfocus? focusPassword: password}/>
            <input required onBlur={()=> setPasswordFocus(false)} onFocus={()=> setPasswordFocus(true)} className='pw register-input' type={showPassword? "text":"password"} placeholder={passwordfocus? "":"Password"} ref={pwRef}></input>
            <img src={show} alt="" className='show-pw' onClick={()=>setshowPassword(!showPassword)}/>
            <span className='pw-rq'>{usernameAlert? "Username must start with a letter and contain between 4 and 15 characters with no spaces: letters, numbers, or (underscore or period)" : passwordAlert? "Password must contain a letter, number, and be at least 8 characters! " : "" }</span>
            <span className='enter-fields'>{error? "Enter required fields!" : ""}</span>
            <span className='taken-error'>{takenError? "This username is taken! Choose Another." : ""}</span>
            <span className='name-error'>{nameError? "Name cannot contain numbers!":""}</span>
            <button type='submit' onClick={handleRegister} className='create-account'>Create Account</button>
        </form>
      </div>
      <br/><br/><br/><br/><br/>
    </div>
  )
}

export default Register