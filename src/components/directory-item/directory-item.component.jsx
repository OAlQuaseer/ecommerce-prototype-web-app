import './directory-item.styles.scss';
import { useNavigate } from 'react-router-dom';


const DirectoryItem = ({ category: { title, imageUrl, route } }) => {
    const navigate = useNavigate();
    const onClickHandler = () => navigate(route);
    return (
        <div className="directory-item-container" onClick={onClickHandler}>
            <div className="background-image" style={{
                backgroundImage: `url(${imageUrl})`
            }}></div>
            <div className="body">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    )
}


export default DirectoryItem