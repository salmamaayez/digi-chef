import React, { useState, useEffect } from 'react';

import { Box, Grid,Card, Typography,  CardContent } from '@mui/material';

export default function CompletedOrdersPage() {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    const loadCompletedOrders = () => {
      const orders = JSON.parse(localStorage.getItem('completedOrders')) || [];
      setCompletedOrders(orders);
    };

    // Charger les commandes complètes au chargement du composant
    loadCompletedOrders();

    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === 'completedOrders') {
        loadCompletedOrders();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Completed Orders
      </Typography>
      <Grid container spacing={2}>
        {completedOrders.map((order, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                <Typography variant="h6" fontWeight="bold">
                  {order.tableName}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {order.items.map((item, idx) => (
                    <Typography key={idx} variant="body2">
                      {item.name}: {item.quantity}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Total: {order.total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
