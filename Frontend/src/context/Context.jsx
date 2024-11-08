import React, { useState } from "react";
import { createContext } from 'react';

export const GlobalContext = createContext(null);

const Context = ({ children }) => {

    const [userInfo,setUserInfo] = useState();

    return (
        <GlobalContext.Provider value={{ setUserInfo: setUserInfo,userInfo:userInfo }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default Context