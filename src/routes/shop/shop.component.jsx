import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';

import CategoriesPreview from './../categories-preview/categories-preview.component';
import Category from './../category/category.component';

import './shop.styles.scss';
import { useDispatch } from 'react-redux';
import { setCategories } from './../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';


const Shop = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesAndDocs = async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    }
    getCategoriesAndDocs();
  })

  return (

    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>

  );
};

export default Shop;