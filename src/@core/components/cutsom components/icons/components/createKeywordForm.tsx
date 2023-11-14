import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
} from '@mui/material';

const styles = {
  formKeyword: {
    fontFamily: 'IBM Plex Mono',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '18px',
    marginTop:'18px'
   
  }
};
function CreateKeywordForm() {
  const [keyword, setKeyword] = useState<string>('');
  const [rssFeed, setRssFeed] = useState<string>('');
  const [isFactiva, setIsFactiva] = useState<boolean>(false);
  const [isCombined, setIsCombined] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Make API call to submit the keyword https://new-alerts-e4f6j5kdsq-ew.a.run.app
      const response = await fetch(
        'https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key_word: {
              key_word: keyword,
              rss_url: rssFeed,
              factiva: isFactiva,
              combined: isCombined,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Set success message
        setSuccessMessage('Your Keyword is validated');
        setKeyword('');
        setRssFeed('');
        setIsFactiva(false);
        setIsCombined(false);
      } else {
        throw new Error('Failed to submit keyword');
      }
    } catch (error) {
      // Set error message
      setErrorMessage('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleChangeRssFeed = (event: ChangeEvent<HTMLInputElement>) => {
    setRssFeed(event.target.value);
  };

  const handleToggleFactiva = () => {
    setIsFactiva((prevIsFactiva) => !prevIsFactiva);
  };
  const handleToggleCombined = () => {
    setIsCombined((prevIsCombined) => !prevIsCombined);
  };
  return (
    <form onSubmit={handleSubmit} style={styles.formKeyword} >
      <h2 style={{ margin: '0px' }}>Add keyword</h2>
      <TextField
        label="Add keyword..."
        variant="outlined"
        value={keyword}
        sx={{ marginTop: '18px' }}
        onChange={handleChangeKeyword}
        fullWidth
        InputLabelProps={{
          style: {
            fontFamily: 'IBM Plex Mono',
          },
        }}
      />
      <TextField
        label="RSS Feed..."
        variant="outlined"
        value={rssFeed}
        onChange={handleChangeRssFeed}
        sx={{ marginTop: '18px' }}
        fullWidth
        InputLabelProps={{
          style: {
            fontFamily: 'IBM Plex Mono',
          },
        }}
      />
      <div>
        <div>
          <FormControlLabel
            control={
              <Switch checked={isCombined} onChange={handleToggleCombined} />
            }
            sx={{
              fontFamily: 'IBM Plex Mono',
            }}
            label="Combined"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          
          sx={{ marginTop: '18px', backgroundColor:'blue' }}
        >
          + Keyword
        </Button>
      </div>
      {successMessage && <h3>{successMessage}</h3>}
      {errorMessage && <h3>{errorMessage}</h3>}
    </form>
  );
}

export default CreateKeywordForm;
