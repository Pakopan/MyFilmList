import React,{createContext, useState} from 'react'


export const WatchListTotalContext = createContext();
export const WatchListTotalProvider = function (props) {
    const [WatchListTotal, setWatchListTotal] = useState([]);
    return (
            <WatchListTotalContext.Provider value={[WatchListTotal, setWatchListTotal]}>
                {props.children}
            </WatchListTotalContext.Provider>
    )
}
