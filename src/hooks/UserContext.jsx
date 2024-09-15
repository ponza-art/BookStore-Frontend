import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  
  return (
    <UserContext.Provider value={{ setUserInfo, userInfo }}>
      {children}
    </UserContext.Provider>
  );
};
