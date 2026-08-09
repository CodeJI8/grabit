import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUserState] = useState(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser || savedUser === "undefined") {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            localStorage.removeItem("user");
            return null;
        }
    });

    const setUser = (userData) => {
        setUserState(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUserState(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};