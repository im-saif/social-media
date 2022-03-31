import React, {useContext, useRef, useState, useEffect} from 'react'
import './css/explore.css'
import Sidebar from './Sidebar'
import { DataContext } from '../DataContext'
import { useNavigate } from 'react-router-dom'
import likedimg from './imgs/explore page/liked.png'
import Post from './Post'

const Explore = () => {

    document.title = "Explore"
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    const [loggedInUserUpdated, setLoggedInUserUpdated] = useState("")
    const [allPosts, setAllPosts] = useState([])
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [test, setTest] = useState(false)
    const [selectedPage, setselectedPage] = useContext(DataContext)
    const [showLoading, setshowLoading] = useState(false)
    setselectedPage("Home")
    const postRef = useRef()
    const url = "https://6124fb4ec334850017459065.mockapi.io/users"
    

    const navigate = useNavigate()


    const getData = async(url) =>{
      const res = await fetch(url)
      let data = await res.json()
      setUsers(data)
      data.map(user=>{
        if(user.id === loggedIn.id){
          setLoggedInUserUpdated(user)
        }
      })
      let count = 1
      while(count <= data.length){
            let postsURL = `https://6124fb4ec334850017459065.mockapi.io/users/${count}/posts`
            const res1 = await fetch(postsURL)
            let data1 = await res1.json()
            allPosts.push(data1.map(data=>{return data}))
            count ++
      }
      
      allPosts.map(userPosts=>{
          userPosts.map(post=>{
            posts.push(post)
          })
          setAllPosts(posts)
      })
      setTest(true)
    }
  
    useEffect(()=>{
      getData(url)
      
    },[])


    const handlePost = () =>{
        const postValue = postRef.current.value.trim() 

        if(postValue === ""){
          alert("Enter something to post!")
          return
        }
        const timeNow = new Date().toLocaleString()

        const postsContent  = {
          post: postValue,
          createdAt: timeNow,
          likes: 0,
          comments: [],
          likedBy: []
        }
        fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${loggedInUserUpdated.id}/posts`,{
              method: 'POST', 
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(postsContent)
        }).then(()=>{
            navigate('/acc')
            navigate('/explore')
        })

    }
    

  allPosts.sort(function(a, b) {
    var c = new Date(a.createdAt);
    var d = new Date(b.createdAt);
    return c-d;
  });

  allPosts.map(post=>{
    users.map(user=>{
      if(user.id === post.userId){
        post.name = `${user.first_name} ${user.last_name}`
        post.username = user.username
        post.image = user.image
      }
    })
  })

  
  setTimeout(() => {
    setshowLoading(true)
  }, 1500)
    
  
  return (<div>
     { loggedIn !== ""?
      <div>
        <Sidebar/>
        <div className='explore-page'>
          <div className='headline'>
              <p className="headline-text">Home</p> 
          </div>
          <div className='creating-post'>
              <img className='pfp' alt="" src={loggedIn.image}/>
              <textarea className='new-post-textarea' placeholder={`What's on your mind, ${loggedIn.first_name}?`} ref={postRef}></textarea>
              <button onClick={handlePost} type='submit' className='post-button'>Post</button>
          </div>
         {showLoading? 
          allPosts.reverse().map(post=>{ 
                return <Post post={post}/>
                
          }) : <div className='loader'></div> }
          <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
        </div> 
        
      </div>
    :<><Sidebar/>
    <h1 className='explore-page'>Login First</h1></>
    }
    </div>
  )
}

export default Explore;