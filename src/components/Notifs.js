import React, {useContext} from 'react'
import Sidebar from './Sidebar'
import { DataContext } from '../DataContext'

const Notifs = () => {

    document.title = "Notifications"

    const [selectedPage, setselectedPage] = useContext(DataContext)
    setselectedPage("Notifs")

  return (
    <div>
        <Sidebar/>
        <div className='headline-acc'>
          <p className='headline-acc-text'>Notifications</p>
        </div>
        <h1 className='coming-soon'>Coming Soon...</h1>
    </div>
  )
}

export default Notifs