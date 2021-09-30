import React,{createContext, useContext, useState} from 'react'
import axios from 'axios';

export const UpdatedFavoriteStatusContext = createContext();
export const FavoriteTotalContext = createContext();
export const FavoriteContext = createContext();

const GetFavoriteTotal = createContext();
export const useGetFavoriteTotal = () => useContext(GetFavoriteTotal);

const API_Key = "1928eb3e6da4e780ca9119f98a6ec513";
const session_id = "de0dd5cc04b5390af28c4db2fd4a63586c9088e4";
const account_id = "11148819";
export const FavoritePostURL = `https://api.themoviedb.org/3/account/${account_id}/favorite?api_key=${API_Key}&session_id=${session_id}`
const FavoriteURL = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${API_Key}&session_id=${session_id}&language=en-US&sort_by=created_at.asc&page=1`

export const FavoriteProvider = function (props) {
    const [TotalFavorite, setTotalFavorite] = useState([]);
    const [UpdatedFavoriteStatus, setUpdatedFavoriteStatus] = useState({});
    const [Favorite, setFavorite] = useState([]);
    const getFavoriteTotal = () => axios.get(FavoriteURL).then((response)=>{setTotalFavorite(response.data.results)});
    return (
            <GetFavoriteTotal.Provider value={getFavoriteTotal}>
            <UpdatedFavoriteStatusContext.Provider value={[UpdatedFavoriteStatus, setUpdatedFavoriteStatus]}>
            <FavoriteTotalContext.Provider value={[TotalFavorite, setTotalFavorite]}>
            <FavoriteContext.Provider value={[Favorite, setFavorite]}>
                {props.children}
            </FavoriteContext.Provider>
            </FavoriteTotalContext.Provider>
            </UpdatedFavoriteStatusContext.Provider>
            </GetFavoriteTotal.Provider>
    )
}
