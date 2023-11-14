// ** MUI Imports
import { Paper,Typography } from '@mui/material'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'


interface ListKeywordInfoProps {
  relatedKeywords: RelatedKeywords | null
}

interface RelatedKeywords {
  [key: string]: number
}

const ListKeywordInfo: React.FC<ListKeywordInfoProps> = ({ relatedKeywords }) => {
  if (relatedKeywords === null) {
    // Handle the case when relatedKeywords is null (optional)
    return <div>No related keywords were found</div>
  }

  return (
    <Paper elevation={1} sx={{ p: 2, bgcolor: '#f6f6f6' }}>

    <List subheader={<li />} sx={{ maxHeight: 300, overflow: 'auto', position: 'relative' }}>
       <Typography variant='h6'>
        Keywords in this content:
       </Typography>
      {Object.entries(relatedKeywords).map(([keyword, value]) =>
        value > 0 ? (
          <Box component='ul' sx={{ p: 0, backgroundColor: 'inherit' }}>
            <ListItem>
              <ListItemText primary={`${keyword}   ${value} times`} />
            </ListItem>
          </Box>
        ) : null
      )}
    </List>
    </Paper>
  )
}

export default ListKeywordInfo
