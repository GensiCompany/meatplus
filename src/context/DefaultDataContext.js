"use client";

import React, { createContext, useContext, useState } from "react";

const DefaultDataContext = createContext();

export const DefaultDataProvider = ({ children, initialData }) => {
    const [defaultData, setDefaultData] = useState(initialData);

    return (
        <DefaultDataContext.Provider value={{ defaultData, setDefaultData }}>
            {children}
        </DefaultDataContext.Provider>
    );
};

export const useDefaultData = () => {
    return useContext(DefaultDataContext);
};
