import React, {createContext, useState} from 'react'

export const DataContext= createContext([]);

export const DataProvider=(props)=>{
    
    const [registered, setRegistered] = useState(false)
    const [selectedPage, setselectedPage] = useState("")

    return(
        <div>
            <DataContext.Provider value={[selectedPage, setselectedPage, registered, setRegistered]}>
                {props.children}
            </DataContext.Provider >

        </div>
    )
}

