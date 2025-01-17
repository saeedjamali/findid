"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
function AppProvider({ children, isAuthenticateUser }) {
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [currentAd, setCurrentAd] = useState({});
  const [isAuthUser, setIsAuthUser] = useState(isAuthenticateUser);
  const [filterList, setFilterList] = useState([]);

  // const [isShowSignInForm, setIsShowSignInForm] = useState("Hello");
  const [token, setToken] = useState("");
  const [signData, setSignData] = useState("");

  useEffect(() => {
    setIsAuthUser(isAuthenticateUser);
  }, [isAuthUser]);

  return (
    <>
      <AppContext.Provider
        value={{
          filterList,
          setFilterList,
          currentAd,
          setCurrentAd,
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
