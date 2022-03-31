import React,{useState, useEffect, useContext} from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import './css/accsettings.css'
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


const AccSettings = () => {

    document.title = "Account Settings"
    const navigate = useNavigate()
    const [selectedPage, setselectedPage] = useContext(DataContext)
    setselectedPage("Account")

    const defaultpic = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEODQkQEBAKCgoLDg4ODQ0NCA8KDQgOFREWGxURFRMYHSggGBolGxMTITEhJSkrLjouFx8zOD84NygtLisBCgoKDQcHDgcGGisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAgQFAwEGB//EADIQAAIBAgQDBgQGAwAAAAAAAAABAgMRBCExQQUSUTJSYWJxgYKRwfAiQnKSobEVouH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EAAAAAAIykkm3ZJatgSIykkrtpLq3YzsVxRK6glJ959kzK1aU3eTcn4/lA2K3EoR0vN+GS+ZTq8Vm+yowX7mUAVHeeMqPWc/Z8v8ARyc29XJ+rIgASU2tHJejIgDvDGVFpOfu+b+yxS4rNdpRmv2soADbo8ShLW8H45r5lyMk1dNNdU7nzBOjWlB3i3F+H5gPpgZmF4onZTSi+8uyaMZJpNWaejRFSAAAAAAAAAAAAq43Fqmus32Y/UCeJxMaavLV6JayMTE4uVR55R2itEc6tRzblJ3bIFQAAAAAAAAAAAAAAAAO+GxcqbyzjvF6M4AD6LDYmNRXjqtU9Ync+ZpVHBqUXZo3MFi1UXSa7UfqRVoAAAAAAIylZNvJJXbA5YvEKnByeb0iu8zAq1HOUpSzbOmMxDqSb0isorojgVAAAAAAAAAAAAAAAAAAAAAAJ0qjhKMo5NEAB9FhMQqkFJZPSS7rO587g8Q6ck9YvKS6o+gjK6TWaaumRUgAAMzi+IslBayzl6dDRnKybeSSuz5utVc5Sk93f9IEAAVAAAAAAAPYxbaSu29kB4C/RwGnO/hRchQjHSMV8IGIDesQnQjLWMX8JFYgL9bAa8j+FlGUWm07prZlR4AAAAAAAAa3CMRdOD1jnH06GSTo1XCUZL8rv+oD6YEYSuk1mmroEVT4rV5adt5u3tuYhf4zUvUjHaEf5f2igVAAAAAAAAHsY3aSzbySNfDYdQXWT1ZW4bS1n7RL5FAAAAAA44nDqa6SWjOwAwpRs2nk1k0eF/iVLSftIoFQAAAAAAABt8Kq81O28Hb22BT4NUtUlHacf5X2wRVfHTvVqvzNfLI4EqjvKT6tsiVAAAAAAAAG3h4csKa6RJhbAigAAAAAAAIYiHNCousTEN57mCAABUAAAAAHfAztVpPzJfPIHKm7Si+jTAEQSqK0pLo2iIAAAAAAAAG3h580Kb6xJlDhtXWHvEvkUAAAAAAABDET5YVH0iYhf4lV0h7yKBUAAAAAAAAASpq8orq0gB1x0LVaq8zfzzOBf4zTtUjLacf5X2igAAAAAAAAB7GVmmsms0zXw2IU10ktUY57GTTTV01ugN0FCjj9OdfEi5CvGWkov4iKmBchOvGOsor4gJnHE4hQXWT0RWrY/XkXxMoyk223dt7sBKV228282zwAqAAAAAAAAO+BherSXmT+WYLHBqd6kpbQj/L+2CKucVpc1O+8Hf23MQ+nnG6aeaasz5utScJSi9nb9RUQAAAAAAAAACXuwAO8MJN7cq834TrHh0t5RXp+ICmC/wD47z/6f9Ivhz2lF+seUCkCxPBTW3MvLI4SjbW6fRoDwAAAAAAAAAnRpOcoxW7t+kDY4VS5ad95u/tsC5CNkksklZAipGZxfD3SmtY5S9OppkZRumnmmrNAfMA74zDunJrWLzi+qOBUAAAPUr21beyJUqbm0lm2amGwyh4y3kBVoYBuzn+Fd1al+nSjHRJf2SBFAAAAAAjOClqlJeKJAChXwGrh+1lGUGm07prZm6c69CM1nrs1rEDFB0r0XB2emz7xzKgAABrcIw9k5vWWUfTqUMHh3UklpFZyfdR9BGNkksklZICQAIoAAOGLw6qQcXk9YvuswKtNwlKMsmj6Yq43CKouk12ZfQDAJQg5NJZt5I9q03BuMlZov8PoWXM+1LTyoqO+GoKEbayer7x1AIoAAAAAAAAAAAAAhWpKcWnps+6Y9am4Saeq37xtlfG0OeOXajmvN4AZJOlTc5RjHNsUqbm1GKu2bmCwiprrN9qX0KieEw6pwUVm9ZPvM7gEUAAAAAAABwxOGjUS5lmtGtYkZQ5fTYsgCoDtOl0y8Dk428APAAAAAAAAAAAAPVG/iB4ShG/p1OkKXXPwOoHKjQjDm5Uk5O7fU6gAAAAAAAAAAAAAAA8aAAhKkvQi6T8GABBwfRnlgAPD2wAHqg+jJqk/BAASjSXqTSAA9AAAAAAAAAAH/9k="

    let loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    const [showChoosePP, setshowChoosePP] = useState(false)
    const [showSubmit, setshowSubmit] = useState(false)
    const imgs = [one, two, three, four, five, six, seven, eight, nine]
    const [chosenImg, setChosenImg] = useState(loggedIn.image? loggedIn.image : defaultpic)
    const url = "https://6124fb4ec334850017459065.mockapi.io/users"

    const capitalize = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1)
    }

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

    const handlepfpChange = () =>{
      const changedContent = {
        image: chosenImg
      }
    fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${loggedIn.id}`,{
        method: 'PUT', 
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(changedContent)
    }).then(()=>{
      setshowSubmit(false)
      getData(url)
      alert("Changed avatar successfully!")
    })

    }
    

  return (
    <div>
        <Sidebar/>
        <div className='headline-acc'>
          <p className='headline-acc-text'>Account Settings</p>
        </div>
        <div className='settings-options'>
          <div className='change-pfp-option'>
            <img onClick={()=> setshowChoosePP(true)} src={chosenImg} className='p-pic' alt=""/>
            <span onClick={()=> setshowChoosePP(true)} className='change-avatar'>Change</span>
            {showChoosePP?
            <div className="choose-pp">
              {imgs.map(img=>{
                return(<img onClick={()=> {setshowChoosePP(!showChoosePP); setChosenImg(img); setshowSubmit(true)}} src={img} alt=""  className={img === chosenImg?'avatar chosen-avatar' : 'avatar'}/>)
              })}
            </div>:null}
          </div>
          {showSubmit? <button type='submit' onClick={handlepfpChange} className='save-changes-to-pfp'>Save Changes</button> : null}
          <div onClick={()=>{ navigate('/account/change-name'); window.location.reload()}} className='settings-option'>
              <img className='arrow-icon' src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"/>
              <h3>Change Name</h3>
          </div>
          <div onClick={()=>{ navigate('/account/change-username'); setselectedPage("")}} className='settings-option'>
          <img className='arrow-icon' src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"/>
            <h3>Change Username</h3> <p className='acc-username-info'>@{loggedIn.username}</p>
          </div>
          <div onClick={()=>{ navigate('/account/change-password'); setselectedPage("")}} className='settings-option'>
            <img className='arrow-icon' src="https://cdn.iconscout.com/icon/free/png-256/right-arrow-1438234-1216195.png"/>
            <h3>Change Password</h3>
          </div>
        </div>
    </div>
  )
}

export default AccSettings