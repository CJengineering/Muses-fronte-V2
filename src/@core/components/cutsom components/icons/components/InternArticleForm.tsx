import React, { useState, useEffect } from 'react';

import {
  TextField,
  Autocomplete,
  Typography,
  Button,
  Snackbar,
} from '@mui/material';

export interface Keyword {
  id: number;
  key_word: string;
  rss_url: string;
  created_at: string;
  updated_at: string;
  factiva: boolean;
}
const styles = {
  formKeyword: {
    fontFamily: 'IBM Plex Mono',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '18px',
   
  }
};
const InternArticleForm: React.FC = () => {
  const [link, setLink] = useState('');
  const [keywords, setKeywords] = useState<Keyword[]>([]); // Explicitly type the keywords state
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(null); // Explicitly type the selectedKeyword state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch keywords from the API endpoint
  useEffect(() => {
    fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/keyword_list')
      .then((response) => response.json())
      .then((data) => setKeywords(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = () => {
    if (selectedKeyword && link) {
      const endpoint = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/articleintern?id=${selectedKeyword.id}&link=${encodeURIComponent(link)}`;
  
      // Make API request to the endpoint
      fetch(endpoint)
        .then((response) => {
          if (response.status === 204) {
            setMessage('Form data sent successfully.');
            setLink(''); 
            setSelectedKeyword(null); 
          } else {
            setMessage('An error occurred while sending form data.');
          }
          setSnackbarOpen(true);
        })
        .catch((error) => {
          setMessage('An error occurred while sending form data.');
          setSnackbarOpen(true);
          console.error('Error:', error);
        });
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setMessage('');
  };

  return (
    <form style={styles.formKeyword}>
      <h2 style={{margin:'0px'}}>Add content</h2>
      <TextField
        label="Add URL..."
        value={link}
        onChange={(event) => setLink(event.target.value)}
        fullWidth
        sx={{marginTop:'18px'}}
        InputLabelProps={{
          style: {
            fontFamily: 'IBM Plex Mono',
          },
        }}
        variant="outlined"
      />
      <Autocomplete
        options={keywords}
        getOptionLabel={(option) => option.key_word}
        value={selectedKeyword}
        onChange={(event, newValue) => setSelectedKeyword(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a Keyword"
            variant="outlined"
            sx={{marginTop:'18px'}}
            InputLabelProps={{
              style: {
                fontFamily: 'IBM Plex Mono',
              },
            }}
          />
        )}
      />
      <Button variant="contained" sx={{marginTop:'18px'}}color='success'onClick={handleSubmit}>+ content</Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </form>
  );
};

export default InternArticleForm;
