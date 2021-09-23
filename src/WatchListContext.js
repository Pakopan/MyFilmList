import React,{createContext, useState} from 'react'


export const WatchListContext = createContext();
export const WatchListProvider = function (props) {
    const [watchList, setWatchList] = useState(0);
    return (
            <WatchListContext.Provider value={[watchList, setWatchList]}>
                {props.children}
            </WatchListContext.Provider>
    )
}
