
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './category.styles.scss';
import ProductCard from "../../components/product-card/product-card.component";

import { CategoriesContext } from "../../contexts/categories.context";

const Category = () => {
    const { categories } = useContext(CategoriesContext);
    const { category } = useParams();
    const [products, setProducts] = useState(categories[category]);

    useEffect(()=>{
        setProducts(categories[category]);
    }, [category, categories]);

    return (
        <div className="category-container">
            {
                products && products.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })
            }
        </div>
    );


};

export default Category;