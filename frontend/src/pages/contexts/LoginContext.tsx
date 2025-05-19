import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

import { User } from "@/interfaces/Types"
import { Applicant, Lecturer } from "@/interfaces/Interfaces";
type LoginContextType = {
  user:Applicant | Lecturer;
  setUser: React.Dispatch<React.SetStateAction<Applicant | Lecturer>>;
};

type LoginProviderProps = {
  children: ReactNode;
};

const loginContext = createContext<LoginContextType | undefined>(undefined);

const defaultUser: Applicant = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  applications: []

};

export function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = useState<Applicant | Lecturer>(defaultUser);

  // useEffect(() => {
  //   const rawPrevUser = localStorage.getItem("prevUser");
  //   if (rawPrevUser) {
  //     try {
  //       const parsedUser = JSON.parse(rawPrevUser);
  //       setUser((prev) => ({ ...prev, ...parsedUser }));
  //     } catch (error) {
  //       console.warn("Failed to parse prevUser from localStorage", error);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("prevUser", JSON.stringify(user));
  // }, [user]);

  return (
      <loginContext.Provider value={{ user, setUser }}>
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
