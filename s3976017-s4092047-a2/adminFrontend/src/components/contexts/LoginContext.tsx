import { createContext, ReactNode, useState, useContext } from "react";

type LoginContextType = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoginProviderProps = {
  children: ReactNode;
};

const loginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: LoginProviderProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </loginContext.Provider>
  );
}

export function useLoginContext() {
  const context = useContext(loginContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}
