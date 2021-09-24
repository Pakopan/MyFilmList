import React,{createContext, useState} from 'react'


export const SearchBarContext = createContext();
export const SearchBarProvider = function (props) {
    const [searchValue, setSearchValue] = useState("avenger");
    return (
            <SearchBarContext.Provider value={[searchValue, setSearchValue]}>
                {props.children}
            </SearchBarContext.Provider>
    )
}
