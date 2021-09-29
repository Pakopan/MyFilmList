import React,{createContext, useState} from 'react'

export const AddedWatchlistStatusContext = createContext();
export const AddedWatchlistStatusProvider = function (props) {
    const [AddedWatchlistStatus, setAddedWatchlistStatus] = useState([]);
    return (
            <AddedWatchlistStatusContext.Provider value={[AddedWatchlistStatus, setAddedWatchlistStatus]}>
                {props.children}
            </AddedWatchlistStatusContext.Provider>
    )
}
