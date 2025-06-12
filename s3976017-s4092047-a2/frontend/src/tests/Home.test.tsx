import Home from "@/pages/index";
import { render, screen } from "@testing-library/react";
import { LoginProvider } from "@/contexts/LoginContext";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

test("renders Good Morning when isMorning is true", () => {
  render(
    <LoginProvider>
      <Home />
    </LoginProvider>
  );
  const loggedOut = screen.getByText(/You are not logged in/i);
  expect(loggedOut).toBeInTheDocument();
});

//   test("renders Good Evening when isMorning is false", () => {
//     render(
//       <LoginProvider>
//         <Greeting />
//       </LoginProvider>
//     );
//     // Update the isMorning context value to false (using a state update function if necessary)
//     const { setIsMorning } = useLoginContext();
//     setIsMorning(false);

//     const eveningGreeting = screen.getByText(/Good Evening!/i);
//     expect(eveningGreeting).toBeInTheDocument();
//   });
