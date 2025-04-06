import {
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react";

type User = {
  User_Name: string;
  User_Email: string;
  User_Type: "default" | "tutor" | "lecturer" | "admin";
  User_Img_Url: string;
}
type LoginContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const loginContext = createContext<LoginContextType | undefined>(undefined);

type LoginProviderProps = {
  children: ReactNode;
};

export function LoginProvider({ children }: LoginProviderProps) {
  //to update user example:
  //     <button
  //       onClick={() =>
  //         setUser({ ...user, User_Type: "lecturer" })
  //       }
  //     >
  const [user, setUser] = useState<User>({
    User_Name: "",
    User_Email: "",
    User_Type: "default",
    User_Img_Url: "",
  });

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
