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
  createPresentatioModalState,
  createPresentationBulkAction,
  createPresentationNewTab,
  createPresentationPosts,
  createPresentationSelectedRows
} from 'src/store/presentation/createPresentation'
import { Data, RowNewProps } from 'src/app/interfaces'
import ActionSelector from 'src/@core/components/cutsom components/icons/components/ActionSelector'
import { clearSelectedRows, resetAndAddRows, toggleSelectedRow } from 'src/store/features/rowSelection/rowSlice'
import Icon from 'src/@core/components/icon'
import { modalKeywordEditToggled } from 'src/store/features/modalStates/modalStateSlice'
import UpdateKeywordForm from 'src/@core/components/cutsom components/icons/components/updtaeKeywordForm'
import { CircularProgress } from '@mui/material'

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
    field: 'keywords',
    headerName: 'Keywords',
    renderCell: (params: GridRenderCellParams) => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary' }}>
              {row.key_word}
            </Typography>
          </Box>
        </Box>
      )
    }
  },

  {
    flex: 0.2,
    minWidth: 110,
    field: 'combined',
    headerName: 'Combined',
    renderCell: (params: GridRenderCellParams) => (
      <div>{params.row.combined ? <Icon icon={'mdi:set-union'} color='green' /> : null}</div>
    )
  },
  {
    flex: 0.125,
    field: 'rss',
    minWidth: 80,
    headerName: 'RSS',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.rss_url ? (
          <Icon icon={'material-symbols:check'} color='green' />
        ) : (
          <Icon icon={'material-symbols:close'} color='red' />
        )}
      </Typography>
    )
  },
  {
    flex: 0.1,
    field: 'action',
    minWidth: 40,
    headerName: 'Actions',

    renderCell: (params: GridRenderCellParams) => (
      <div className='action-column'>
        <UpdateKeywordForm
          keywordId={params.row.id}
          keywordName={params.row.key_word}
          rss={params.row.rss_url}
          factiva={params.row.factiva}
          combined={params.row.combined}
        />
      </div>
    )
  }
]

const TableKeyword = () => {
  // ** States
  //const [data] = useState<Post[]>(rows)

  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Data[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })
  const dispatch = useAppDispatch()
  const tableStatus = useAppSelector(createPresentationNewTab)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Data[]>([])
  const handleRowSelectionChange = (selectionModel: GridRowId[]) => {
    // Dispatch the toggleSelectedRow action for each selected row

    dispatch(resetAndAddRows(selectionModel as number[]))

    console.log('CHANGED', selectionModel)
  }
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
  const fetchRows = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchRows()
  }, [])
  return (
    <Card>
      <CardHeader title='Keywords' />
      {loading ? (
        <Card> 
           <CircularProgress color='success' />
        </Card>
      
      ) : (
        <DataGrid
          autoHeight
          columns={columns}
          pageSizeOptions={[100, 7, 10, 25, 50]}
          paginationModel={paginationModel}
          onRowSelectionModelChange={handleRowSelectionChange}
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

export default TableKeyword
