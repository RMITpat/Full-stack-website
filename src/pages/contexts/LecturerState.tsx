// hooks/useLecturerState.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type LecturerState = string; // You can replace this with a stricter union type like "default" | "editing" | "viewing"

interface LecturerStateContextType {
    lecturerState: LecturerState;
    setLecturerState: (state: LecturerState) => void;
}

const LecturerStateContext = createContext<LecturerStateContextType | undefined>(undefined);

export const LecturerStateProvider = ({ children }: { children: ReactNode }) => {
    const [lecturerState, setLecturerState] = useState<LecturerState>("default");

    return (
        <LecturerStateContext.Provider value={{ lecturerState, setLecturerState }}>
            {children}
        </LecturerStateContext.Provider>
    );
};

export const useLecturerState = () => {
    const context = useContext(LecturerStateContext);
    if (!context) {
        throw new Error("useLecturerState must be used within a LecturerStateProvider");
    }
    return context;
};
export { LecturerStateContext };
