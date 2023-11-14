import React, { useState, ChangeEvent, FormEvent } from 'react'
import { TextField, IconButton, Switch, FormControlLabel, Modal, Box, Typography, Button } from '@mui/material'

import { toast } from 'react-hot-toast'
import Icon from '../../../icon'

interface UpdateKeywordFormProps {
  keywordId: number
  keywordName: string
  rss: string
  factiva: boolean
  combined: boolean
}

function UpdateKeywordForm({ keywordId, keywordName, rss, combined, factiva }: UpdateKeywordFormProps) {
  const [keyword, setKeyword] = useState<string>(keywordName)
  const [rssFeed, setRssFeed] = useState<string>(rss)
  const [isFactiva, setIsFactiva] = useState<boolean>(factiva)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [isCombined, setIsCombined] = useState<boolean>(combined)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(`https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words/${keywordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key_word: {
            key_word: keyword,
            rss_url: rssFeed,
            factiva: isFactiva,
            combined: isCombined
          }
        })
      })

      if (response.status === 200) {
        const data = await response.json()
        toast.success('Your keyword has been updated successfully')
        console.log(response.status, data)
        setSuccessMessage('Keyword updated successfully')
        handleClose()
      } else {
        throw new Error('Failed to update keyword')
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words/${keywordId}`, {
        method: 'DELETE'
      })

      if (response.status === 302) {
        toast.success('Your keyword has been deleted')
        setSuccessMessage('Keyword deleted successfully')
        handleClose()
        window.location.reload()
      } else {
        throw new Error('Failed to delete keyword')
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.')
      console.error(error)
      window.location.reload()
    }
  }

  const handleChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('Keyword change event:', event.target.value)
    setKeyword(event.target.value)
  }

  const handleChangeRssFeed = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('RSS feed change event:', event.target.value)
    setRssFeed(event.target.value)
  }

  const handleToggleFactiva = () => {
    setIsFactiva(prevIsFactiva => !prevIsFactiva)
  }
  const handleToggleCombined = () => {
    setIsCombined(prevIsCombined => !prevIsCombined)
  }
  return (
    <>
      <div style={{ display: 'flex', padding: '0px' }}>
        <IconButton onClick={handleOpen}>
          <Icon icon={'ph:pencil'} style={{ cursor: 'pointer' }} />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Icon icon={'ph:trash'}  style={{ cursor: 'pointer' }} />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Update Keyword: "{keywordName}"
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label='Keyword'
                variant='outlined'
                value={keywordName}
                onChange={handleChangeKeyword}
                fullWidth
                margin='normal'
              />
              <TextField
                label='RSS Feed'
                variant='outlined'
                value={rssFeed}
                onChange={handleChangeRssFeed}
                fullWidth
                margin='normal'
              />
              <FormControlLabel
                control={<Switch checked={isFactiva} onChange={handleToggleFactiva} />}
                label='Factiva'
              />
              <FormControlLabel
                control={<Switch checked={isCombined} onChange={handleToggleCombined} />}
                label='Combined'
              />
              <Button type='submit' variant='contained' color='primary'>
                Update
              </Button>
            </form>
          </Typography>
          <IconButton onClick={handleClose}></IconButton>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateKeywordForm
