import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  useAnalyzer,
  useAppDispatch,
  useAppSelector,
  useUpdateArchive,
  useUpdateShortlist,
  useWebflow
} from 'src/@core/hooks/hooks'

import { ActionStatus, actionSelected } from 'src/store/features/actionState/actionStateSlice'
import { Button } from '@mui/material'
import { selectedPostFiltred } from 'src/store/features/posts/postsSlice'
import { filterStateChanged } from 'src/store/features/filterState/filterStateSlice'
import { clearSelectedRows } from 'src/store/features/rowSelection/rowSlice'
import { Post, RowNewProps } from 'src/app/interfaces'
import {
  createPresentationBulkAction,
  createPresentationPosts,
  createPresentationSelectedRows
} from 'src/store/presentation/createPresentation'
import toast from 'react-hot-toast'

export default function ActionSelector() {
  function findArticleById(articles: RowNewProps[], idToFind: number): Post | null {
    const foundArticle = articles.find(article => article.id === idToFind)
    if (foundArticle) {
      return foundArticle as unknown as Post
    } else {
      return null
    }
  }
  const presentationData = useAppSelector(createPresentationPosts)
  const actionStatus = useAppSelector(createPresentationBulkAction)
  const dispatch = useAppDispatch()
  const presentationBulk = useAppSelector(createPresentationSelectedRows)
  const { updateArchive } = useUpdateArchive()
  const { updateShortlist } = useUpdateShortlist()
  const { handleAnalyser } = useAnalyzer()
  const { handleWebflow } = useWebflow()
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(actionSelected(event.target.value as ActionStatus))
  }
  const handleBulkArchive = async () => {
    toast.success(`Your content item was successfully ${actionStatus.status}ed`)
    presentationBulk.selectedRows.forEach(async item => {
      if (actionStatus.status == 'archive') {
        await updateArchive(item)

        dispatch(selectedPostFiltred(item))
      }
      if (actionStatus.status == 'shortlist') {
        await updateShortlist(item)
        dispatch(selectedPostFiltred(item))
      }
      if (actionStatus.status == 'analyse') {
        await handleAnalyser(item)
      }
      if (actionStatus.status == 'webflow') {
        const post = findArticleById(presentationData, item)
        if (post?.link !== null && post?.link !== undefined) {
          await handleWebflow(post.link, item)
          dispatch(selectedPostFiltred(item))
        }
      }
    })
    //await dispatch<any>(fetchPosts(presentationTableStatus.status));

    dispatch(filterStateChanged(false))
    dispatch(clearSelectedRows())
  }
  console.log('selected rows In action selector', presentationBulk.selectedRows)
  return (
    <Box
      sx={{
        display: 'flex',
        columnGap: '1rem',
        alignItems: 'top',
        marginTop: '1rem'
      }}
    >
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Action</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={actionStatus.status}
          label='Age'
          onChange={handleChange}
        >
          <MenuItem value={'archive'}>Bin</MenuItem>
          <MenuItem value={'shortlist'}>Shortlist</MenuItem>
          <MenuItem value={'webflow'}>Webflow</MenuItem>
          <MenuItem value={'analyse'}>Analyse</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handleBulkArchive}
        variant='contained'
        color={actionStatus.status == 'archive' ? 'error' : actionStatus.status == 'shortlist' ? 'success' : 'info'}
      >
        {actionStatus.status}
      </Button>
    </Box>
  )
}
