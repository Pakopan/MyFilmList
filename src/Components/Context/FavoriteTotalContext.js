import React,{createContext, useState} from 'react'


export const FavoriteTotalContext = createContext();
export const FavoriteTotalProvider = function (props) {
    const [FavoriteTotal, setFavoriteTotal] = useState([]);
    return (
            <FavoriteTotalContext.Provider value={[FavoriteTotal, setFavoriteTotal]}>
                {props.children}
            </FavoriteTotalContext.Provider>
    )
}
