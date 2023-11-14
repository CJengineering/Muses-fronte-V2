import { GridToolbarQuickFilter } from '@mui/x-data-grid'
import React from 'react'
import TabsIcon from 'src/views/components/tabs/TabsIcon'
import TableColumns from 'src/views/table/data-grid/TableColumns'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import TableSelection from 'src/views/table/data-grid/TableSelection'

const Content = () => {
  return (
    <>
      <TabsIcon />
      <TableFilter />
    </>
  )
}
export default Content
