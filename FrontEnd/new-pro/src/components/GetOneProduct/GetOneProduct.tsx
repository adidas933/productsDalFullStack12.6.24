import { useState } from 'react';
import { Products } from '../models/productModel';

export const GetOneProduct = () => {
  const [oneProduct, setOneProduct] = useState<Products | null>(null);
  const [inputId, setInputId] = useState<string>('');

  const handleInputId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(event.target.value);
  };

  const displayProduct = async () => {
    const id = +inputId;
    const response = await fetch(`http://localhost:4000/api/products/${id}`);
    const product = await response.json();
    console.log(product);
    setOneProduct(product);
  };
  return (
    <div>
      <div>
        <p>Search for your product:</p>
        <input
          onChange={handleInputId}
          type='number'
          placeholder='Enter product ID'
        />
        <button onClick={displayProduct}>Display Product</button>
      </div>
      <div>
        {oneProduct && (
          <div>
            <p>{oneProduct.id}</p>
            <p>{oneProduct.name}</p>
            <p>{oneProduct.price}</p>
          </div>
        )}
      </div>
    </div>
  );
};
