import './App.css';
import { GetAllProducts } from './components/GetAllProducts/GetAllProducts';
import { AddNewProduct } from './components/AddNewProduct/AddNewProduct';
import { GetOneProduct } from './components/GetOneProduct/GetOneProduct';

function App() {

  return (
    <div>
      <p>Products List:</p>
      <GetAllProducts />
      <AddNewProduct />
      <GetOneProduct />
    </div>
  );
}

export default App;
