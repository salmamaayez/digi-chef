
import React, { useState, useEffect } from 'react';

import { Box,Card,Grid,Stack,   Button,Container, Typography, CardContent } from '@mui/material';

export default function PendingOrdersPage() {
 
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const loadOrders = () => {
      const orders = JSON.parse(localStorage.getItem('orders')) || [];
      setPendingOrders(orders);
    };

    // Charger les commandes au chargement du composant
    loadOrders();

    const handleStorageChange = (event) => {
      if (event.storageArea === localStorage && event.key === 'orders') {
        loadOrders();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleMarkAsReady = (index) => {
    const updatedOrders = pendingOrders.filter((_, i) => i !== index);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setPendingOrders(updatedOrders);

    // Ajouter l'ordre à la liste des commandes complètes
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    completedOrders.push(pendingOrders[index]);
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
  };

  const handleClearAll = () => {
    // Effacer les commandes en cours et les commandes complétées
    localStorage.removeItem('orders');
    localStorage.removeItem('completedOrders');
    setPendingOrders([]);
  };

  return (
    <Container sx={{ position: 'relative' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">
          Current Orders
        </Typography>
        <Stack direction="row" spacing={2}>

          <Button variant="contained" onClick={handleClearAll}>
            Clear all
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {pendingOrders.map((order, index) => (
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
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                  onClick={() => handleMarkAsReady(index)}
                >
                  Ready
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
