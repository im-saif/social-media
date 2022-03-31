import React, {useContext} from 'react'
import Sidebar from './Sidebar'
import { DataContext } from '../DataContext'

const Chat = () => {

    document.title = "Chat"

    const [selectedPage, setselectedPage] = useContext(DataContext)
    setselectedPage("Chat")

  return (
    <div>
        <Sidebar/>
        <div className='headline-acc'>
          <p className='headline-acc-text'>Chat</p>
        </div>
        <h1 className='coming-soon'>Coming Soon...</h1>
    </div>
  )
}

export default Chat