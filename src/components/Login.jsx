import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function Login({ onLogin, pickers }) {
  const [name, setName] = useState('');
  const [error, setHasError] = useState(false);

  const handleSubmit = (event) => {
    setHasError(false);
    event.preventDefault();

    if (pickers.find(picker => picker.name.toLowerCase() === name.toLowerCase())) {
      onLogin(name);
    } else {
      setHasError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h2" component="h1" gutterBottom color="red">
          Vem är det som traskar in i stugan min?
        </Typography>

        {error && (
          <Typography color="red">
            Du är inte en del av vår familj, vad fan gör du här? (I tomtestaden tillåts inga smeknamn)
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{borderColor: 'red'}}
            label="Ditt namn"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: 'red' } }}
            InputProps={{ style: { color: 'red' } }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ color: 'red', backgroundColor: '#fff' }}>
            Logga in
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;