import { useNavigate } from 'react-router-dom';
import React, {useState  ,useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Table, Paper,  TableRow,Container, TableHead,TableBody,TableCell,Typography,  TableContainer } from '@mui/material';

export default function CurrentOrdersPage() {
    const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Charger les commandes depuis sessionStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);
const handleClearOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]);
  };
  return (
    <Container sx={{ position: 'relative' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          Current Orders
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{
              padding: '8px 18px',
              borderColor: '#B0B0B0',
              color: '#333',
              '&:hover': {
                borderColor: '#1F45FC',
                backgroundColor: '#1F45FC',
                color: '#fff',
              },
            }}
          >
            Back 
          </Button>
          <Button variant="contained" onClick={handleClearOrders}>
            Clear all
          </Button>
        </Stack>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Table Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Items</Typography></TableCell>
              <TableCell><Typography variant="h6">Price</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.tableName}</TableCell>
                <TableCell>
                  {order.items.map((item, idx) => (
                    <div key={idx}>{item.name} (x{item.quantity})</div>
                  ))}
                </TableCell>
                <TableCell>{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
