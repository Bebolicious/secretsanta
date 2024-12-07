import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://xgricksqyemhlhjxshtc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhncmlja3NxeWVtaGxoanhzaHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1Nzg0NzIsImV4cCI6MjA0OTE1NDQ3Mn0.S_NdM8NSABCp8WjT8hy2vNiUhNN8V6D4-WmhrP9keiM"
);

function pickerGreeting(picker) {
  if (picker.toLowerCase() === 'susanne') return 'Hej Mamma!';
  if (picker.toLowerCase() === 'christian') return 'Hej Chribba!';
  else return 'Hej ' + picker;
}

function Home({ picker, pickers }) {
  const [secretSanta, setSecretSanta] = useState('');
  const [hasGiven, setHasGiven] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const checkIfGiven = async () => {
      const { data } = await supabase
        .from('secretsantaresult')
        .select()
        .eq('secretSantaGiver', picker);

      if (data.length > 0) {
        setHasGiven(true);
        setSecretSanta(data[0].secretSantaReceiver);
      }
    };

    checkIfGiven();
  }, [picker]);

  const handleButtonClick = async () => {
    const otherPickers = pickers.filter(p => p.name.toLowerCase() !== picker.toLowerCase());
    const randomPicker = otherPickers[Math.floor(Math.random() * otherPickers.length)];
    setSecretSanta(randomPicker.name);

    // Remove the selected name from the pickers table
    await supabase
      .from('pickernames')
      .delete()
      .eq('name', randomPicker.name);

    // Add a new entry to the secretsantaresult table
    await supabase
      .from('secretsantaresult')
      .insert([
        { secretSantaGiver: picker, secretSantaReceiver: randomPicker.name }
      ]);

    setHasGiven(true);
    setButtonClicked(true);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4" component="h1" gutterBottom color="red">
          {pickerGreeting(picker)}
        </Typography>
        {!hasGiven ? (
          <Button variant="contained" color="primary" sx={{ color: 'red' }} onClick={handleButtonClick}>
            Vem är du secret santa för?
          </Button>
        ) : (
          <Typography variant="h2" component="h2" gutterBottom color="red">
            {buttonClicked ? `Du är secret santa för: ${secretSanta}` : "Du är klar för denna gången, kolla med Alex om du glömt vem du skall ge en julklapp till"}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Home;