import React, { useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/accsettings.css'
import show from '../imgs/login stuff/show.png'
import Sidebar from '../Sidebar'

const ChangePassword = () => {

    document.title = "Change Password"
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    const [showPassword1, setshowPassword1] = useState(false)
    const [showPassword2, setshowPassword2] = useState(false)
    const currentpwRef = useRef()
    const newpwRef = useRef()
    const navigate = useNavigate()
    const url = "https://6124fb4ec334850017459065.mockapi.io/users"

    const getData = async(url) =>{
      const res = await fetch(url)
      let data = await res.json()
      data.map(user=>{
        if(user.id === loggedIn.id){
          localStorage.setItem("loggedIn", JSON.stringify(user))
        }
      })
    }
    useEffect(()=>{
      getData(url)
    })

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

    const handlePasswordChange = (e) =>{
        e.preventDefault()
        const currentpwValue = currentpwRef.current.value.trim()
        const newpwValue = newpwRef.current.value.trim()
        if (currentpwValue === "" || newpwValue === ""){
          alert("Enter required fields")
          return
        }
        if(currentpwValue !== loggedIn.password){
          alert("Incorrect password!")
          return
        }

        if(currentpwValue === newpwValue){
          alert("New Password cannot be the same as current one!")
          return
        }

        if(newpwValue.length < 8){
          alert("New Password must be at least 8 characters!")
          return
        }
        if (checkForNum(newpwValue) === false || checkForLetters(newpwValue) === false){
          alert("New Password must contain a letter and a number!")
          return
        }

      const changedContent = {
          password: newpwValue
      }
      fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${loggedIn.id}`,{
          method: 'PUT', 
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(changedContent)
      }).then(()=>{
        navigate('/acc')
        navigate('/account/change-password')
        navigate("/account")
        alert("Changed Password Successfully!")
      })
    }

  return (
    <div>
        <Sidebar/>
            <div className='headline-acc'>
                <p className='headline-acc-text'>Change Password</p>
            </div>
            <form className='change-name-form'>
                <label className='change-first-name-label change-username-label' htmlFor='currentpassword'>Current Password</label>
                <input required name='currentpassword' className='change-first-name change-username change-pass-padding' type={showPassword1? "text":"password"} placeholder='Your Current Password' ref={currentpwRef}/>
                <img src={show} alt="" className='change-pass-show-icon1' onClick={()=>setshowPassword1(!showPassword1)}/>
                <label className='change-first-name-label change-password-label' htmlFor='newpassword'> New Password</label>
                <input required name='newpassword' className='change-first-name change-password change-pass-padding' type={showPassword2? "text":"password"} placeholder='New Password cannot be the same as current one' ref={newpwRef}/>
                <img src={show} alt="" className='change-pass-show-icon2' onClick={()=>setshowPassword2(!showPassword2)}/>
                <button onClick={handlePasswordChange} type='submit' className='change-password-submit'>Save Changes</button>
            </form>
    </div>
  )
}

export default ChangePassword