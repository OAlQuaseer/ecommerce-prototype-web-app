import { useContext, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoriesPreview from './../categories-preview/categories-preview.component';
import Category from './../category/category.component';

import './shop.styles.scss';

const Shop = () => {
  const { categories } = useContext(CategoriesContext);

  return (

    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>

  );
};

export default Shop;