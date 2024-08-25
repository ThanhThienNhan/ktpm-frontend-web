import React, { createContext, useContext, useState } from 'react';

const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
    const [brandId, setBrandId] = useState(null);

    return (
        <BrandContext.Provider value={{ brandId, setBrandId }}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => useContext(BrandContext);
