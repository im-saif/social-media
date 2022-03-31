import React, {useEffect, useState, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SideBar from './Sidebar'
import './css/postpage.css'
import menu from './imgs/explore page/menu-icon.png'


const PostPage = () => {

  const [currentUser, setCurrentUser] = useState("")
  const [users, setUsers] = useState([])
  const [showMenu, setshowMenu] = useState(false)
  const [showEdit, setshowEdit] = useState(false)

  const {username} = useParams()
  const {id} = useParams()
  const commentRef = useRef()
  const editedPostRef = useRef()
  const navigate = useNavigate()

  const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
  const [loggedInUserUpdated, setLoggedInUserUpdated] = useState("")

  const getData = async(url) =>{
    const res = await fetch(url)
    let data = await res.json()
    setUsers(data)
    setCurrentUser(data.filter(user=>{
      return user.username === username
    }))
    data.map(user=>{
      if(user.id === loggedIn.id){
        setLoggedInUserUpdated(user)
      }
    })
  }

  const url = "https://6124fb4ec334850017459065.mockapi.io/users"
 
  useEffect(()=>{
    getData(url)
  },[]) 

  const properTime = (timeNow)=>{
    let time = timeNow.split(", ")
    let date = time[1].split(" ")
    let ans = date[0].split(":")
    let day = time[0].split("/")
    let temp = day[0]
    day[0] = day[1]
    day[1] = temp
    return ans.splice(0,2).join(":") + " " + date[1] +  " · " + day.join("/")
  }

  const shortTime = (timeNow)=>{
    let time = timeNow.split(", ")
    let getTime = properTime(timeNow)
    let arr = getTime.split(" · ")
    let postDate = arr[1]
    let postDay = postDate.split("/")[0]
    let postMonth = postDate.split("/")[1]
    let postYear = postDate.split("/")[2]
    let postTime = arr[0]
    let splitArr = postTime.split(":")
    let postMinsWith = splitArr[1]
    let postMins = postMinsWith.split(" ")[0]
    let postHours = postMinsWith.split(" ")[1] === "PM"? splitArr[0] !== "12"? Number(splitArr[0]) + 12 : 12 : splitArr[0] === "12"? 0 : Number(splitArr[0])
    
    let minutesNow = new Date().getMinutes()
    let hourNow = new Date().getHours()
    let dateNow = new Date().toLocaleString().split(", ")[0]
    let monthNow = dateNow.split("/")[0]
    let dayNow = dateNow.split("/")[1]
    let yearNow = dateNow.split('/')[2]
    
    if(time[0] === dateNow ){
          if(hourNow - postHours === 0){
              if (minutesNow - postMins === 0){
                  return "Just Now"
              }else if(minutesNow - postMins < 60){
                  return minutesNow - postMins + " mins"
              }
          }else if(hourNow - postHours <= 1){
              if(minutesNow - postMins+60 < 60){
                  return minutesNow - postMins + 60 + " mins"
              }else{
                  return "1 hr"
              }
          }
          else{
              if (postMins > minutesNow){
                  return hourNow - postHours - 1 + " hrs"
              }
              return hourNow - postHours +  " hrs"
          }
    }else{
        if(yearNow - postYear === 1){
            if (Number(postMonth) >= Number(monthNow)){
                if(Number(postDay) > Number(dayNow)){
                   return monthNow - postMonth + 11 + " mo"
                }else{
                    return monthNow - postMonth + 12 === 12? "1 yr": monthNow - postMonth + 12 +" mo"
                }
            }else{
                  return yearNow - postYear + " yr"
            }
        } else if(yearNow - postYear > 1){
            if (Number(postMonth) >= Number(monthNow)){
               if(Number(postDay) > Number(dayNow)){
                   return yearNow - postYear - 1 + " yrs"
               }else{
                   return yearNow - postYear + " yrs"
               }
            }
        }
        else{
            if(monthNow - postMonth > 0){
                if (postDay > dayNow ){
                    return monthNow - postMonth - 1 + " mo"
                }else{
                    return monthNow - postMonth + " mo"
                }
            }else{
                  if (postDay !== dayNow  && Number(postDay) !== Number(dayNow) - 1){
                          if(postHours > hourNow){
                              return dayNow - postDay - 1 + " days"
                          }else if(postHours === hourNow){
                            if(postMins <= minutesNow){
                              return dayNow - postDay + " days"
                            }else{
                              return dayNow - postDay -1 + " days"
                            }
                          }
                          else{
                              return dayNow - postDay + " days"
                          }
                           
                  }else{
                      if(Number(postDay) === Number(dayNow) - 1){
                        if(postMins <= minutesNow){
                          return hourNow+24 - postHours >= 24? "1 day" : hourNow+24 - postHours + " hrs"
                        }else{
                          return hourNow+24 - postHours -1 >= 24? "1 day" : hourNow+24 - postHours -1 + " hrs"
                        }
                      }
                  }
              }
                    
          }
      }
  
  }


  const handleComment = () =>{
      const commentValue = commentRef.current.value.trim()
      if(commentValue === ""){
        alert("Enter a comment first!")
        return
      }

      const changedContent = {
        comments: [{
          comment: commentValue,
          createdAt: new Date().toLocaleString(),
          userId: loggedInUserUpdated.id
        }, ...currentUser[0].posts[id-1].comments]
      }


      fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${currentUser[0].posts[id-1].userId}/posts/${currentUser[0].posts[id-1].id}`,{
          method: 'PUT', 
          headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(changedContent)
        }).then(()=>{
          window.location.reload()
        })
  }

  // let currentPost =  currentUser[0].posts[id-1].post
  // let currentUsername = currentUser[0].username
  // let currentName = `${currentUser[0].first_name} ${currentUser[0].last_name}`
  // let currentImage = currentUser[0].image
  // let createdAt = currentUser[0].posts[id-1].createdAt
  // let commentsLength = currentUser[0].posts[id-1].comments.length

  document.title = currentUser? currentUser[0].posts[id-1].post : "Post "

  const handleDeletePost = () => {
    fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${currentUser[0].posts[id-1].userId}/posts/${currentUser[0].posts[id-1].id}`,{
          method: 'DELETE', 
          headers: {
          'Content-type': 'application/json'
        }}).then(()=>{
          navigate('/explore')
        })
  }

  const handleEditPost = () =>{
    const editedPostValue = editedPostRef.current.value.trim()
    if(editedPostValue === ""){
      alert("Please enter edited post first!")
      return
    }
    if(editedPostValue === currentUser[0].posts[id-1].post){
      alert("Thats the same post! Edit the post first.")
      return 
    }

    const changedContent = {
      post: editedPostValue
    }

    fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${currentUser[0].posts[id-1].userId}/posts/${currentUser[0].posts[id-1].id}`,{
          method: 'PUT', 
          headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(changedContent)
        }).then(()=>{
          window.location.reload()
        })

  }

  function auto_grow(id) {
    let element = document.getElementById(id)
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }
  
  return( 
    <div>{currentUser? <div>
      <SideBar/>
      <div className='post1'>
            <img src={currentUser[0].image} alt="" className='post-pfp1'/>
            <h4 className='post-name1'>{`${currentUser[0].first_name} ${currentUser[0].last_name}`}</h4>
            <p className='post-username1'>@{currentUser[0].username} <strong>·</strong> {shortTime(currentUser[0].posts[id-1].createdAt)} </p>
            {loggedInUserUpdated.id === currentUser[0].id && !showEdit? <img onClick={()=>{setshowMenu(!showMenu)}} className='menu-icon' src={menu} alt=""/> : ""}
            {showMenu?<div className='menu-options'>
                <h4 onClick={()=>{ setshowEdit(true); setshowMenu(false) }} className='edit-post'>Edit Post</h4>
                <h4 onClick={handleDeletePost} className='delete-post'>Delete Post</h4>
            </div> : ""}
            {showEdit?<> <textarea onFocus={() => auto_grow("edit-post")} onInput={()=> auto_grow("edit-post")} id="edit-post" className='edit-post-textarea' ref={editedPostRef}>{currentUser[0].posts[id-1].post}</textarea>
             <button onClick={handleEditPost} type='submit' className='save-edited-post'>Save Changes</button> </> :
             <h3 className='post-content1'>{currentUser[0].posts[id-1].post}</h3>} 
            <p className='post-proper-time'>{properTime(currentUser[0].posts[id-1].createdAt)}</p>
      </div>
      <h3 className='title'>{currentUser[0].posts[id-1].comments.length} Comments</h3>
      <div className='write-comment'>
        <img src={loggedInUserUpdated.image} alt="" className='comment-pfp' />
        <textarea className='comment-textarea' placeholder='Write a comment...' ref={commentRef}></textarea>
        <button onClick={handleComment} className='send-comment' type='submit'>Comment</button>
      </div>
      <div className='comments'>
        {currentUser[0].posts[id-1].comments.map(comment=>{
          users.map(user=>{
            if(user.id === comment.userId){
                  comment.name = `${user.first_name} ${user.last_name}`
                  comment.username = user.username
                  comment.image = user.image
            }
            
          })
          return(
            <div className='show-comment'>
              <img src={comment.image} alt="" className='post-pfp1'/>
              <h4 className='post-name1'>{comment.name}</h4>
              <p className='post-username1'>@{comment.username} <strong>·</strong> {shortTime(comment.createdAt)} </p>
              <h3 className='post-content1'>{comment.comment}</h3> 
            </div>
          )
          
        })}
      </div>
      <br/><br/><br/><br/><br/>
      
    </div> : <div className='loader-comment-page'></div>
    }</div>
  )
}

export default PostPage