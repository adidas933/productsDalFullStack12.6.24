import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FixedSizeList } from 'react-window';
import ProductListItem from './ProductListItem';
import { Products } from '../models/productModel';

export const GetAllProducts: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch('http://localhost:4000/api/products');
    const products = await response.json();
    console.log(products);
    setProducts(products);
  };

  return (
    <Box
      sx={{
        width: '100%',  
        height: 400,
        maxWidth: 360,
        bgcolor: 'background.paper',
        margin: 'auto',
        }}
        >
      {products.length > 0 && (
        <FixedSizeList
          height={400}
          width={360}
          itemSize={70}
          itemCount={products.length}
          overscanCount={5}
          itemData={products}
        >
          {ProductListItem}
        </FixedSizeList>
      )}
    </Box>
  );
};
