import CategoriesList from './../../components/categories-list/categories-list.component'
import { Outlet } from 'react-router-dom';

const Home = () => {

  

  return (
    <div>
        <Outlet/>
        <CategoriesList/>
    </div>
    
  );
}

export default Home;
