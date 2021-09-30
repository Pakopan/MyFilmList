import React,{createContext, useState} from 'react'


export const UpdatedWatchlistStatusContext = createContext();
export const UpdatedWatchlistStatusProvider = function (props) {
    const [UpdatedWatchlistStatus, setUpdatedWatchlistStatus] = useState({});
    return (
            <UpdatedWatchlistStatusContext.Provider value={[UpdatedWatchlistStatus, setUpdatedWatchlistStatus]}>
                {props.children}
            </UpdatedWatchlistStatusContext.Provider>
    )
}
