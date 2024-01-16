// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAppDispatch, useAppSelector } from 'src/@core/hooks/hooks'
import { createPresentationNewTab } from 'src/store/presentation/createPresentation'
import { NewTableStatus, selectedNewTableValue } from 'src/store/features/new table selctor/newTableSlice'

const TabsIcon = () => {
  // ** State
  const [value, setValue] = useState<string>('1')
  const presentationNewTab = useAppSelector(createPresentationNewTab);
  const dispatch = useAppDispatch();
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const handleChangeCustom = async (
    event: React.SyntheticEvent,
    newValue: NewTableStatus
  ) => {
    console.log('this is the new Value', newValue);

     console.log('table status', presentationNewTab.status);
      dispatch(selectedNewTableValue(newValue));
    
   
  };

  return (
    <TabContext value={ presentationNewTab.status}>
      <TabList onChange={handleChangeCustom} aria-label='icon tabs example'>
        <Tab value='incoming' label='Incoming' icon={<Icon icon='ep:list' />} />
        <Tab value='shortlist' label='Shortlist' icon={<Icon icon='material-symbols:thumb-up-outline' />} />
        <Tab value='published' label='Published' icon={<Icon icon='tabler:brand-webflow' />} />
        <Tab value='archived' label='Bin' icon={<Icon icon='ic:outline-archive' />} />
      </TabList>
     
    </TabContext>
  )
}

export default TabsIcon
