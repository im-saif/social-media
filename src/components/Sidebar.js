import React, {useState, useContext} from 'react'
import './css/explore.css'
import home from './imgs/explore page/home.png'
import homeHoverimg from './imgs/explore page/homeHover.png'
import settings from './imgs/explore page/settings.png'
import settingsHoverimg from './imgs/explore page/settingsHover.png'
import notifs from './imgs/explore page/notifs.png'
import notifsHoverimg from './imgs/explore page/notifsHover.png'
import chat from './imgs/explore page/chat.png'
import chatHoverimg from './imgs/explore page/chatHover.png'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../DataContext'

const Sidebar = () => {

    const [logoutHover, setlogoutHover] = useState(false)
    const [homeHover, sethomeHover] = useState(false)
    const [chatHover, setchatHover] = useState(false)
    const [notifsHover, setnotifsHover] = useState(false)
    const [settingsHover, setsettingsHover] = useState(false)
    const [selectedPage, setselectedPage] = useContext(DataContext)

    const navigate = useNavigate()

  return (
    <div className='sidebar'>
        <img className='icon home-icon' src={homeHover || selectedPage === "Home"? homeHoverimg : home } alt=""/>
        <h2 onClick={()=> navigate('/explore')} onMouseEnter={()=> sethomeHover(true)} onMouseLeave={()=> sethomeHover(false)} className={selectedPage === "Home"? "bar-option home-option blue-color" : 'bar-option home-option'}> Home</h2>
        <img className='icon chat-icon' src={chatHover || selectedPage === "Chat"? chatHoverimg : chat} alt=""/>
        <h2 onClick={()=> navigate('/chat')} onMouseEnter={()=> setchatHover(true)} onMouseLeave={()=> setchatHover(false)} className={selectedPage === "Chat"? 'bar-option chat-option blue-color' : "bar-option chat-option"}>Chat</h2>
        <img className='icon notifs-icon' src={notifsHover || selectedPage === "Notifs"? notifsHoverimg : notifs} alt=""/>
        <h2 onClick={()=> navigate('/notifications')} onMouseEnter={()=> setnotifsHover(true)} onMouseLeave={()=> setnotifsHover(false)} className={selectedPage === "Notifs"?"bar-option notif-option blue-color" :'bar-option notif-option'}>Notifications</h2>
        <img className='icon settings-icon' src={settingsHover || selectedPage === "Account"? settingsHoverimg : settings} alt=""/>
        <h2 onClick={()=> navigate('/account')} onMouseEnter={()=> setsettingsHover(true)} onMouseLeave={()=> setsettingsHover(false)} className={selectedPage === "Account"? "bar-option acc-option blue-color" : 'bar-option acc-option'}>Account</h2>
        <img className='icon logout-icon' alt="" src={logoutHover?"https://cdn0.iconfinder.com/data/icons/thin-line-color-2/21/05_2-512.png" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AAAA6Ojr7+/swMDAODg7Pz8+WlpaGhobg4ODd3d3w8PDX19fa2trj4+Ovr6+0tLSmpqYpKSmenp6Pj49ZWVm/v79nZ2d4eHjo6Oju7u4kJCS6urqIiIhLS0tCQkIZGRl2dnZRUVFmZmZdXV02NjY+Pj655hBrAAAEY0lEQVR4nO2d21bbMBBF7dzBgTjkHgIBSvj/TywhXZSisVHs0ZE6Ofu1WZU3uloaebKMEEIIIYQQQgghhBBCCCHkP2Ozm632nV57DvvFQzmOrfOd8SjX5nVSxLb6pDs9qPt9sL6OrXZi+BTG78jqNrZdlg3uwvkdmccW1O9/3+ldxfQr3oILvlPGE7y9Rwjm+TSW4A3G751hHMFNH2YYpxa7oCZ6YhnBcIUUzPMtXHCKFcwf0YJbsGCeT8CGz3DDHLsQv8UL5g9QQ/Awc6ILFNzEEMxnQMNZ9WP0W1P5Xx+AhvKCuz/UeQ0odntZEbe1IY8zI8V+shNrEveuOJGK152vxNeWhWoRdayF0rWX/+JgBpsShW6iv6iSGgpq16YrlD3QL6XnlrJTL0WmcIvuBZiNH8J3hSqELrIKUMzALQY1mI7dokOsGa8xxUgIf9wQzefKLWYUoBgJGipBw4DQUAkaBoSGStAwIDRUgoYBoaESNAwIDZWg4TcKxc0wkKFwdlBpOFncPd13RjdKRYMMCzcisKKY8vMHC51dcZBh9ugUI+87f42t66tUI8rQCfe4F7va/N8faRzBoQyd0wPxENh5GoWwW5Rhtvy3kL34I/eYqL0izDAbfi3jSRxFpNPa1g0VZ/hllMxf5GFSPK1tO9wADbPiz2nsW1Xonhyk3LKhIg3fGS+Xg03lvz6Lhi1rEWxYz9x9mA9a9cWkDEv3Ydo31KQMhQPp9opJGdaE2DVvqGkZ1sTYNVZMyzDbVSs2baiJGcqT/omGk0ZqhnWKzRpqcobqtZieYZ1ik76YoKFyQ03RUFcxSUPVhpqmoaZiooaKDTVVQ71JI1lDtYZ6pmEXR92NunNq8QzD7nL90gHibpP/5Yy+6G+4DHxZ/zz8G6q3YfjL+ufhrehrmJpgnldv2TUyFH4Wmxddww7e4Ec8r4T7GSZYhd43p/wMq7Zq4+J32O9n+Av/+B743ZD0M3zFP74HfvezWIcn7PdD+2Op/fkwxUpUXtPYX5emp6j+bnEB74cX8I5/sjS9TwMm0l4bDvP7peb3vM2fW5g/ezJ/fqh7kp+goflzfPOxGObjaczHRJmPa6uJTWwcCp2Wofn4UvsxwvbjvC3E6hu/b2H+zoz5e0/m766Zv39o/w6p/XvA5u9y27+Pb/+bCva/i8FvmwSEhkrQMCA0VIKGAaGhEjQMCA2VoGFAaKgEDQNi39B+jhL7eWbi5QpCZc8D5XsSYsRR+Z7s5+yC5F0T8/PB8q7Zz51nP/9hZQ5LhaO7LIkclheQh9R+Lln7+YCj5HQGjjNHnvGG2LzcF5Bbve6WWBD0l4U/Ah5stnhDae0fDs9L2LpsqudmdaYxBLPsBiYYLUBXfAEIQKQaPFLIS3BlyniCGeLKfc/vcyThGAQeUsFrNZGhG2Gnxgq2M1NLd3oI47fWeaNWYTxSnxxfS/BS+0e2y9nqsdNrz2G/mJfADQtCCCGEEEIIIYQQQgghhJBU+A2OclmzYRJ3QgAAAABJRU5ErkJggg=="}/>
        <h2 onClick={()=>{localStorage.setItem("loggedIn", ""); navigate("/")}} onMouseEnter={()=> setlogoutHover(true)} onMouseLeave={()=> setlogoutHover(false)} className='bar-option logout-option'>Log Out</h2>
        
    </div>
  )
}

export default Sidebar