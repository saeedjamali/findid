"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
function AppProvider({ children, isAuthenticateUser, viewAd }) {
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [currentAd, setCurrentAd] = useState(viewAd);
  const [isAuthUser, setIsAuthUser] = useState(isAuthenticateUser);
  const [filterList, setFilterList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // const [isShowSignInForm, setIsShowSignInForm] = useState("Hello");
  const [token, setToken] = useState("");
  const [signData, setSignData] = useState("");
  const [search, setSearch] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setIsAuthUser(isAuthenticateUser);
    setCurrentAd(viewAd);
  }, [isAuthUser, viewAd]);

  return (
    <>
      <AppContext.Provider
        value={{
          counter,
          setCounter,
          isFilter,
          setIsFilter,
          search,
          setSearch,
          refresh,
          setRefresh,
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
