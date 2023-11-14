// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InternArticleForm from './InternArticleForm'
import { Box } from '@mui/material'
import CreateKeywordForm from './createKeywordForm'
import { maxWidth } from '@mui/system'

const CardDashboard = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card sx={{maxWidth:'600px'}}>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Add keyword' />
          <Tab value='2' label='Add custom content' />

        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
          
         
            <Box sx={{maxWidth:'600px'}}>
          
         
        
            <CreateKeywordForm/>
        
           
          
            </Box>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
          
         
          <Box sx={{maxWidth:'600px'}}>
       
           <InternArticleForm/>
            </Box>
          </TabPanel>
         
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardDashboard
