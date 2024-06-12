import { useState } from 'react';

export const AddNewProduct = () => {
  const [inputName, setInputName] = useState<string>('');
  const [inputPrice, setInputPrice] = useState<string>('');

  const addProduct = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      name: inputName,
      price: inputPrice,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:4000/api/products', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleInputPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(event.target.value);
  };

  return (
    <div>
      <div>
        <p>Add new product:</p>
        <input
          onChange={handleInputName}
          type='text'
          placeholder='Product Name'
        />
        <input onChange={handleInputPrice} type='number' placeholder='Price' />
        <button onClick={addProduct}>Add Product</button>
      </div>
    </div>
  );
};
