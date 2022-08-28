
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './category.styles.scss';
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

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