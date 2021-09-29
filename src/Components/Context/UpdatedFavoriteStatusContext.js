import React,{createContext, useState} from 'react'


export const UpdatedFavoriteStatusContext = createContext();
export const UpdatedFavoriteStatusProvider = function (props) {
    const [UpdatedFavoriteStatus, setUpdatedFavoriteStatus] = useState([]);
    return (
            <UpdatedFavoriteStatusContext.Provider value={[UpdatedFavoriteStatus, setUpdatedFavoriteStatus]}>
                {props.children}
            </UpdatedFavoriteStatusContext.Provider>
    )
}
