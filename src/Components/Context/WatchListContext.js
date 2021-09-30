import React,{createContext, useState, useContext} from 'react'
import axios from 'axios';

export const AddedWatchlistStatusContext = createContext();
export const UpdatedWatchlistStatusContext = createContext();
export const WatchListContext = createContext();
export const WatchListTotalContext= createContext();
const GetWatchListTotalContext = createContext();

export const useGetWatchListTotal = () => useContext(GetWatchListTotalContext);

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";
const watchListURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`
export const watchListPostURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${API_Key}&session_id=${session_id}`


export const WatchListProvider = function (props) {
    const [AddedWatchlistStatus, setAddedWatchlistStatus] = useState({success:true});
    const [UpdatedWatchlistStatus, setUpdatedWatchlistStatus] = useState({});
    const [watchList, setWatchList] = useState([]);
    const [watchListTotal, setWatchListTotal] = useState([]);

    const getWatchlistTotal = () => axios.get(watchListURL).then((response)=>setWatchListTotal(response.data.results));

    return (
            <GetWatchListTotalContext.Provider value={getWatchlistTotal}>
            <AddedWatchlistStatusContext.Provider value={[AddedWatchlistStatus, setAddedWatchlistStatus]}>
            <UpdatedWatchlistStatusContext.Provider value={[UpdatedWatchlistStatus, setUpdatedWatchlistStatus]}>
            <WatchListTotalContext.Provider value={[watchListTotal, setWatchListTotal]}>
            <WatchListContext.Provider value={[watchList, setWatchList]}>
                {props.children}
            </WatchListContext.Provider>
            </WatchListTotalContext.Provider>
            </UpdatedWatchlistStatusContext.Provider>
            </AddedWatchlistStatusContext.Provider>
            </GetWatchListTotalContext.Provider>
    )
}
