// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType, Post } from 'src/@fake-db/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
//import { rows } from 'src/@fake-db/table/static-data'
import { rows } from 'src/@fake-db/table/static-posts'
import GoogleIcon from 'src/@core/components/icon/GoogleIcon'
import BingNewIcon from 'src/@core/components/icon/BingNewIcon'
import BellIcon from 'src/@core/components/icon/BellIcon'
import HeartIcon from 'src/@core/components/icon/HeartIcon'
import ArchiveIcon from 'src/@core/components/icon/ArchiveIcon'
import SlackIcon from 'src/@core/components/icon/SlackIcon'
import ThumbUpIcon from 'src/@core/components/icon/ThumbUpIcon'
import ChatGptIcon from 'src/@core/components/icon/ChatGptIcon'
import WebflowIcon from 'src/@core/components/icon/WebflowIcon'
import { useAppDispatch, useAppSelector } from 'src/@core/hooks/hooks'
import { fetchPosts } from 'src/store/features/posts/fetchPosts'
import {
  createPresentationBulkAction,
  createPresentationNewTab,
  createPresentationPosts,
  createPresentationSelectedRows
} from 'src/store/presentation/createPresentation'
import { RowNewProps } from 'src/app/interfaces'
import ActionSelector from 'src/@core/components/cutsom components/icons/components/ActionSelector'
import { clearSelectedRows, resetAndAddRows, toggleSelectedRow } from 'src/store/features/rowSelection/rowSlice'
import { set } from 'nprogress'
import { CircularProgress } from '@mui/material'
import DialogInfoPost from 'src/views/components/dialogs/DialogInfoPost'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}
interface SourceObj {
  [key: string]: {
    icon: JSX.Element
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}
const statusSource: SourceObj = {
  google: { icon: <GoogleIcon /> },
  bing: { icon: <BingNewIcon /> },
  google_alert: { icon: <BellIcon /> },
  custom: { icon: <HeartIcon /> }
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns: GridColDef[] = [
  {
    flex: 0.4,
    minWidth: 290,
    field: 'title',
    headerName: 'Title',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
              <a href={row.link} target='_blank' style={{textDecoration:'none', color: row.comments?.length > 0 ? 'orange' : 'inherit'}}>{row.title}</a>
            </Typography>
          </Box>
          <DialogInfoPost id={row.id}/>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 40,
    field: 'source',
    headerName: 'Source',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params
      const status = statusSource[row.source]

      if (status && status.icon) {
        return (
          <div>
            {status.icon} {/* Display the associated icon */}
          </div>
        )
      } else {
        return row.source // Display only the source text if no icon found
      }
    }
  },
  {
    flex: 0.2,
    type: 'date',
    minWidth: 120,
    headerName: 'Date',
    field: 'date',
    valueGetter: params => new Date(params.value),
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {new Date(params.row.date).toLocaleDateString()}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'keyword',
    headerName: 'Keywords',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.keyword}
      </Typography>
    )
  },
  {
    flex: 0.125,
    field: 'score',
    minWidth: 80,
    headerName: 'score',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.score}
      </Typography>
    )
  },
  {
    flex: 0.2,
    field: 'action',
    minWidth: 110,
    headerName: 'Action',

    renderCell: (params: GridRenderCellParams) => (
      <div className='action-column'>
        <ArchiveIcon id={params.row.id} />
        <SlackIcon link={params.row.link} keyword={params.row.keyword} />
        <ThumbUpIcon id={params.row.id} />
        <ChatGptIcon id={params.row.id} />
        <WebflowIcon id={params.row.id} link={params.row.link} />
      </div>
    )
  }
]

const TableColumns = () => {
  // ** States
  const selectedRowIds = useAppSelector(createPresentationSelectedRows)
  //const [data] = useState<Post[]>(rows)
  const [selectedRowIds2, setSelectedRowIds2] = useState<GridRowId[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<RowNewProps[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const tableStatus = useAppSelector(createPresentationNewTab)
  const data = useAppSelector(createPresentationPosts)
  const handleRowSelectionChange = (selectionModel: GridRowId[]) => {
    // Dispatch the toggleSelectedRow action for each selected row

    dispatch(resetAndAddRows(selectionModel as number[]))

    console.log('CHANGED', selectionModel)
  }
  console.log('selected rows in Data grid', selectedRowIds.selectedRows)
  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // Assuming fetchPosts is an asynchronous function that returns a promise
        await dispatch<any>(fetchPosts(tableStatus.status));
  
        // Data fetching is complete, set loading to false
      } catch (error) {
        // Handle errors if necessary
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
    console.log('useffect working')
  }, [ tableStatus.status])

  return (
    <Card>
      <Box sx={{ display: ' flex' }}>
        <CardHeader title='Content' />
        {selectedRowIds.selectedRows.length > 0 ? <ActionSelector /> : null}
      </Box>
      {loading ? (
        <Card>
          <Box sx={{display:'flex', justifyContent:'center', height:'300px', alignItems:'center'}}>

          <CircularProgress color='success' />
          </Box>
        </Card>
      ) : (
        <DataGrid
          autoHeight
          columns={columns}
          pageSizeOptions={[100, 7, 10, 25, 50]}
          paginationModel={paginationModel}
          onRowSelectionModelChange={handleRowSelectionChange}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: QuickSearchToolbar }}
          onPaginationModelChange={setPaginationModel}
          rows={filteredData.length ? filteredData : data}
          slotProps={{
            baseButton: {
              variant: 'outlined'
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
        />
      )}
    </Card>
  )
}

export default TableColumns
