import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
//declaring the type FormData so we can store it
// interface FormData {
//   name: string;
//   email: string;
//   age: string;
//   occupation: string;
// }

//this sets the data that we will be giving out and accepting from other places
// type loginContextType = {
//     // dataSubmission: FormData | null | undefined ;
//     // setDataSubmission: (data: FormData) => void | undefined;
//     occupationString: string
// }

//this is the context itself
const loginContext = createContext<string | undefined>(undefined);

//this sets the props for if we use the loginprovider tags
type LoginProviderProps = {
  children: ReactNode;
};

//this is used as loginprovider tags which you can wrap around other components  i think?
export function LoginProvider({ children }: LoginProviderProps) {
  /*stores the current data submission. what's in here will be loaded in the page. the type is FormData or null because it either has previous login
    details or doesn't. It is type formData so that it can hold the formData variable that is also of type FormData*/
  // const [dataSubmission, setDataSubmission] = useState<FormData | null >()
  // //this effect happens every time the registrationform component is mounted
  // useEffect(() => {
  //   //it will get the lastFormSubmission from local storage
  //   const lastFormSubmission = localStorage.getItem("lastFormSubmission")

  //   //if it exists then
  //   if (lastFormSubmission) {
  //       //convert it back to formData and then set it as the current dataSubmission
  //       setDataSubmission(JSON.parse(lastFormSubmission))
  //   }

  // }, []);
  const occupationString = "lecturer";
  return (
    <loginContext.Provider value={occupationString}>
      {children}
    </loginContext.Provider>
  );
}
//todo write and expose update functions that can be used to change the values in this context
//todo use those methods in login on the successful login case
//todo the context provider should use local storage to read in the user info
//this makes it so we can call useLOginContext from other pages instead of doing context = useContext(loginContext) its just a way to save time
export function useLoginContext() {
  const context = useContext(loginContext);
  if (context === undefined) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
}
