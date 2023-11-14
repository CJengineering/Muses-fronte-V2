// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ArticleInfo from 'src/@core/components/cutsom components/icons/components/ArticleInfo'
interface DialogInfoPostProps {
    id: number
}
const DialogInfoPost = (id : DialogInfoPostProps) => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <div style={{position:'relative'}}>
      <IconButton
       
        onClick={handleClickOpen}
       
      >
        <Icon icon='material-symbols:info-outline' />
      </IconButton>

      <Dialog fullWidth maxWidth= {'md'} onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
          <Typography variant='h6' component='span'>
            Content informations & comments
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 4 }}>
       <ArticleInfo id={id.id}/>
        </DialogContent>
    
      </Dialog>
    </div>
  )
}

export default DialogInfoPost
