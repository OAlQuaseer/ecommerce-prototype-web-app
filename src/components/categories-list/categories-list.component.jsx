import './categories-list.scss';
import DirectoryItem from '../directory-item/directory-item.component';


const CategoriesList = ({ categories }) => (
    <div className="categories-container">
        {categories.map(category => (
            <DirectoryItem key={category.id} category={category} />
        ))}
    </div>
);


export default CategoriesList;