import React,{createContext, useState} from 'react'


export const FavoriteContext = createContext();
export const FavoriteProvider = function (props) {
    const [Favorite, setFavorite] = useState([]);
    return (
            <FavoriteContext.Provider value={[Favorite, setFavorite]}>
                {props.children}
            </FavoriteContext.Provider>
    )
}
