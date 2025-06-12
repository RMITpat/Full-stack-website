import { createContext, ReactNode, useState, useContext } from "react";

import { User } from "@/interfaces/Types";
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
  User_Email: "test",
  User_FirstName: "",
  User_Type: "default",
  User_Password: "test",
  User_Date_Joined: new Date(),
  User_Updated_At: new Date(),
  User_blocked: false,
};

export function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = useState<User>(defaultUser);

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
