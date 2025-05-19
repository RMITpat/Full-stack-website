import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

import { User } from "@/interfaces/Types";
import { Applicant, Lecturer } from "@/interfaces/Interfaces";
type LoginContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

type LoginProviderProps = {
  children: ReactNode;
};

const loginContext = createContext<LoginContextType | undefined>(undefined);

const defaultUser: User = {
  User_id: -1,
  User_Applications: [],
  User_Courses_Assigned_To: [],
  User_LastName: "",
  User_Votes: [],
  User_Email: "",
  User_FirstName: "",
  User_Type: "default",
  User_Password: "",
  User_Img_Url: "",
};

export function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = useState<User>(defaultUser);

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
