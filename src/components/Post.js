import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import likedimg from './imgs/explore page/liked.png'

const Post = (props) => {


    const [likeCount, setLikeCount] = useState("")
    const [selectedPost, setselectedPost] = useState("")
    const [liked, setLiked] = useState("")
    const [test, setTest] = useState(false)
    const [postId, setPostId] = useState("")
    const navigate = useNavigate()

    const getPost = async() =>{
        const res = await fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${props.post.userId}/posts/${props.post.id}`)
        let data = await res.json()
        setLikeCount(data.likes) 
        setselectedPost(data)
        if(data.likedBy.includes(loggedInUserUpdated.id)){
            setLiked(true)
        }else{setLiked(false)}
    }   

    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    const [loggedInUserUpdated, setLoggedInUserUpdated] = useState("")
    const [postUser, setPostUser] = useState("")
    const url = "https://6124fb4ec334850017459065.mockapi.io/users"

    const getData = async(url) =>{
        const res = await fetch(url)
        let data = await res.json()
        data.map(user=>{
          if(user.id === loggedIn.id){
            setLoggedInUserUpdated(user)
            }
          if(props.post.userId === user.id){
              setPostUser(user)
          }  
        })
        setTest(!test)
    }

    useEffect(()=>{
        getPost()
      },[test])
    useEffect(()=>{
        getData(url)
    },[])
    
    const handleLike = (post) =>{
        
        setLiked(!liked)
        
        if(liked){
            setLikeCount(likeCount-1)
            const changed = {
            likes: likeCount-1, 
            likedBy: props.post.likedBy.filter(liked=>{return liked !== loggedInUserUpdated.id})
          }
          
          fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${post.userId}/posts/${post.id}`,{
          method: 'PUT', 
          headers: {
          'Content-type': 'application/json'
          },
          body: JSON.stringify(changed)
          })
          return
        }
        
        setLikeCount(likeCount+1)
        
  
        const changedContent = {
          likes: likeCount+1,
          likedBy: [...props.post.likedBy, loggedInUserUpdated.id]
        }
      
        fetch(`https://6124fb4ec334850017459065.mockapi.io/users/${post.userId}/posts/${post.id}`,{
          method: 'PUT', 
          headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(changedContent)
        }).then(()=>{
          //window.location.reload()
        })
    }

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
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
      }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    return (
        <div>
            <div onClick={()=>{ navigate(replaceAll(`/explore/${props.post.username}/${postUser.posts.map(post=>{if(post.id === props.post.id){return (postUser.posts.indexOf(post)+1)}})}`,",",""))}} className='post' key={props.post.id}>
                    <img src={props.post.image} alt="" className='post-pfp'/>
                    <h4 className='post-name'>{props.post.name}</h4>
                    <p className='post-username'>@{props.post.username} <strong>·</strong> {shortTime(props.post.createdAt)} </p>
                    <h3 className='post-content'>{props.post.post}</h3> 
                    <div className='like-and-comment'>
                        <img onClick={(e)=>{e.stopPropagation(); handleLike(props.post)}} alt="" className={liked? 'liked-post': 'like-post'} src={liked? likedimg:'data:image/png;base64,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'}/>
                        <p className={liked? "liked-count" : 'like-count'}>{likeCount}</p>
                        <img className={liked? 'comments-icon-liked' : 'comments-icon'} src="https://static.thenounproject.com/png/638755-200.png" alt=""/>
                        <p className={liked? 'comments-count-liked' : 'comments-count'}>{props.post.comments.length}</p>
                    </div>
            </div>
        </div>
    )
}

export default Post