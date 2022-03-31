import React, { useRef,useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/accsettings.css'
import Sidebar from '../Sidebar'

const ChangeUsername = () => {

    document.title = "Change Username"
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    const [usernameArray, setUsernameArray] = useState([])
    const unRef = useRef()
    const url = "https://6124fb4ec334850017459065.mockapi.io/users"
    const navigate = useNavigate()

    const getData = async(url) =>{
        const res = await fetch(url)
        let data = await res.json()
        data.map(user=>{
            if(user.id === loggedIn.id){
              localStorage.setItem("loggedIn", JSON.stringify(user))
            }
        })
        setUsernameArray(data.map(user=>{return user.username}))
    }
    
    useEffect(()=>{
        getData(url)
      })

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

    const handleUsernameChange = (e) =>{
        e.preventDefault()
        const unValue = unRef.current.value.toLowerCase().trim()
        if (unValue === ""){
            alert("Enter a username first!")
            return
        }

        if(unValue === loggedIn.username){
            alert("Choose a new Username!")
            return
        }
        if(!(/[a-zA-Z]/).test(unValue[0])){
            alert("Username must start with a letter!")
            return
        }

        if (checkUsername(unValue) === false){
            alert("Username must start with a letter and contain between 4 and 15 characters with no spaces: letters, numbers, or (underscore or period)")
            return
        }
    
        if(usernameArray.includes(unValue)){
            alert("Username is taken! Choose another.")
            return
        }

        const changedContent = {
            username: unValue
        }
        fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${loggedIn.id}`,{
            method: 'PUT', 
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(changedContent)
        }).then(()=>{
            navigate('/acc')
            navigate('/account/change-username')
            navigate("/explore")
            alert(`Changed Username to ${unValue} Successfully!`)
        })

    }

    return (
        <div>
            <Sidebar/>
            <div className='headline-acc'>
                <p className='headline-acc-text'>Change Username</p>
            </div>
            <form className='change-name-form'>
                <label className='change-first-name-label change-username-label' htmlFor='username'>Username</label>
                <input required name='username' className='change-first-name change-username' type="text" placeholder={loggedIn.username} ref={unRef}/>
                <button onClick={handleUsernameChange} type='submit' className='change-name-submit'>Save Changes</button>
            </form>
        </div>
  )
}

export default ChangeUsername