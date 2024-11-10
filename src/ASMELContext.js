import React, { createContext, useState } from "react";

export const AsmelContext = createContext();
// Create a provider component
export const ASMELSessionProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  return (
    <AsmelContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </AsmelContext.Provider>
  );
};
