"use client"


import React, { createContext, useContext, useState } from 'react'


const AppContext = createContext();
function AppProvider({ children }) {
    const [phone, setPhone] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    // const [isShowSignInForm, setIsShowSignInForm] = useState("Hello");
    const [token, setToken] = useState("");
    const [signData, setSignData] = useState("");
    // console.log("App Provider token--->", token)
    // console.log("App Provider signData--->", signData)
    return (
        <>
            <AppContext.Provider value={{
                token,
                signData,
                setToken,
                setSignData,
                phone,
                setPhone,
                identifier,
                setIdentifier,
                password,
                setPassword,
               
            }}>{children}</AppContext.Provider>
        </>
    )
}

export default AppProvider;

export function useAppProvider() {
    return useContext(AppContext)
}