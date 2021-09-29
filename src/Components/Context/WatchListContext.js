import React,{createContext, useState} from 'react'


export const WatchListContext = createContext();
export const WatchListProvider = function (props) {
    const [watchList, setWatchList] = useState([]);
    return (
            <WatchListContext.Provider value={[watchList, setWatchList]}>
                {props.children}
            </WatchListContext.Provider>
    )
}
