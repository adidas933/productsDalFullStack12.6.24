import React, { useState } from 'react';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListChildComponentProps } from 'react-window';

const ProductListItem: React.FC<ListChildComponentProps> = ({
  index,
  style,
  data,
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const product = data[index];

  const handleDelete = () => {
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch(`http://localhost:4000/api/products/${product.id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          setIsDeleted(true);
          console.log(`Deleted product with id: ${product.id} successfully`);
        } else {
          console.error('Failed to delete product');
        }
      })

      .catch((error) => console.error('Error deleting product: ', error));
  };

  if (isDeleted) {
    return null;
  }


  return (
    <ListItem style={style} key={product.id} component='div' disablePadding>
      <ListItemButton>
        <ListItemText
          primary={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box>
                <Typography sx={{ color: 'black' }}>
                  <span style={{ fontWeight: 'bold' }}>ID:</span> {product.id},
                  <span style={{ fontWeight: 'bold' }}> Name:</span>{' '}
                  {product.name}
                </Typography>
                <Typography sx={{ color: 'black' }}>
                  Price: {product.price}
                </Typography>
              </Box>
              <IconButton edge='end' aria-label='delete' onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ProductListItem;
