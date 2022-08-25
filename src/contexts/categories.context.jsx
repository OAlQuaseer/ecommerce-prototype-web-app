import { createContext, useEffect, useState } from "react";
import SHOP_DATA from '../shop-data';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';




export const CategoriesContext = createContext({
    categories: {},
    setCategories: () => null
});



export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const getCategoriesAndDocs = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            setCategories(categoriesMap);
            console.log(categoriesMap);
        }
        getCategoriesAndDocs();
    }, [])

    const value = {
        categories,
        setCategories
    };
    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>)

};
