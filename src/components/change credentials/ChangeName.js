import React, { useRef, useEffect} from 'react'
import Sidebar from '../Sidebar'
import '../css/accsettings.css'
import { useNavigate } from 'react-router-dom'

const ChangeName = () => {

    document.title = "Change name" 
    
    const navigate = useNavigate()

    const url = "https://6124fb4ec334850017459065.mockapi.io/users"
    
    const fnRef = useRef()
    const lnRef = useRef()

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

    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))

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

    const capitalize = (string) =>{
        let words = string.split(" ")
        for (var i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        return words.join(" ")
    }

    const handleNameChange = (e) =>{
        e.preventDefault()
        const fnValue = capitalize(fnRef.current.value.trim())
        const lnValue = capitalize(lnRef.current.value.trim())
        if(fnValue === "" || lnValue === "" ){
            alert("Enter required fields")
            return
        }
        if (checkForNum(fnValue) || checkForNum(lnValue)){
            alert("Name cannot contain numbers!")
            return
        }
        const changedContent = {
            first_name: fnValue,
            last_name: lnValue
        }

        fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${loggedIn.id}`,{
            method: 'PUT', 
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(changedContent)
        }).then(()=>{
            navigate('/account')
            navigate('/account/change-name')
            navigate("/explore")
            navigate('/account')
            alert(`Changed Name to ${capitalize(fnValue)} ${capitalize(lnValue)} Successfully! `)
        })
    }

  return (
    <div>
        <Sidebar/>
        <div className='headline-acc'>
            <p className='headline-acc-text'>Change Name</p>
        </div>
        <form className='change-name-form'>
            <label className='change-first-name-label' htmlFor='first_name'>First Name</label>
            <input required name='first_name' className='change-first-name' type="text" placeholder={capitalize(loggedIn.first_name)} ref={fnRef}/>
            <label className='change-last-name-label' htmlFor='last_name'>Last Name</label>
            <input required name='last_name' className='change-last-name' type="text" placeholder={capitalize(loggedIn.last_name)} ref={lnRef}/>
            <button onClick={handleNameChange} type='submit' className='change-name-submit'>Save Changes</button>
        </form>
    </div>
  )
}

export default ChangeName