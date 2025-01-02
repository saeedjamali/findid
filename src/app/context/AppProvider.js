"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
function AppProvider({ children, isAuthenticateUser }) {
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [ads, setAds] = useState({});
  const [isAuthUser, setIsAuthUser] = useState(isAuthenticateUser);

  // const [isShowSignInForm, setIsShowSignInForm] = useState("Hello");
  const [token, setToken] = useState("");
  const [signData, setSignData] = useState("");
  // console.log("App Provider token--->", token)
   console.log("App Provider signData--->", isAuthUser)
  useEffect(() => {
    setIsAuthUser(isAuthenticateUser);
  }, [isAuthUser]);

  return (
    <>
      <AppContext.Provider
        value={{
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
          isAuthUser,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
}

export default AppProvider;

export function useAppProvider() {
  return useContext(AppContext);
}
