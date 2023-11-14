import { Divider, List, ListItem, ListItemText, Paper, Typography, dividerClasses } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import CommentForm from './CommentForm'
import ListKeywordInfo from 'src/views/components/list/ListKeywordsInfo'
import React from 'react'

interface Article {
  id: number
  key_word_id: number
  title: string
  published: string
  link: string
  posted: boolean
  created_at: string
  updated_at: string
  category_label: string
  score: number
  score_second: null | number
  key_word: {
    key_word: string
  }
}

interface RelatedKeywords {
  [key: string]: number
}
interface Comment {
  id: number
  body: string
  user_id: number
  post_id: number
  created_at: string
  updated_at: string
}

interface APIResponse {
  article: Article
  related_keywords: RelatedKeywords
  array_keywords: number
  summary: string
  comments: Comment[]
}
interface PropsId {
  id: number
}
export default function ArticleInfo({ id }: PropsId) {
  const [userId, setUserId] = useState<number | undefined >()

  const [errorMessage, setErrorMessage] = useState<boolean>(false)
  const [summary, setSummary] = useState<string>('')
  const [dataApi, setDataApi] = useState<APIResponse | null>(null)
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedKeywords, setRelatedKeywords] = useState<RelatedKeywords | null>(null)
  const [arrayKeywords, setArrayKeywords] = useState<number>(0)

  const [loading, setLoading] = useState(true)
  const [loadComments, setLoadComments] = useState(false)
  const userName = (id: number) => {
    switch (id) {
      case 1:
        return 'Nat'
      case 2:
        return 'Tim'
      case 3:
        return 'Sabrina'
      case 4:
        return 'Melissa'
      case 5:
        return 'Nader'
      default:
        return '' // Handle the case when id is not 1, 2, 3, or 4
    }
  }
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('id', id)
        const userDataString = localStorage.getItem('userData')
        
        if (userDataString) {
          const userData = JSON.parse(userDataString)
          
          const id = userData ? userData.id : null
          
          setUserId(id)
        }
        const response = await fetch(`https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`)
        const data: APIResponse = await response.json()
        setDataApi(data)
        setArticle(data.article)
        setRelatedKeywords(data.related_keywords)
        setArrayKeywords(data.array_keywords)
        setSummary(data.summary)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setErrorMessage(true)
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  const fetchComments = async () => {
    setLoadComments(true)
    try {
      const response = await fetch(`https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`)
      const data: APIResponse = await response.json()
      setDataApi(data)

      setLoadComments(false)
    } catch (error) {
      console.error(error)
      setErrorMessage(true)
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <>
        <div className='container_loading'>
          <div className='loading_text'>
            <p>Analyzing the article ...</p>
          </div>
          <div className='loading_indicator'>
            <CircularProgress />
          </div>
        </div>
      </>
    )
  }
  if (errorMessage) {
    return (
      <>
        <div className='container_loading'>
          <div className='loading_text'>
            <p>Details not available ... Please try later </p>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div >
        <ListKeywordInfo relatedKeywords={relatedKeywords} />
        <div>
          <div>
            {dataApi && dataApi.comments && (
              <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant='h5' component='h2'>
                  Comments
                </Typography>
                {loadComments ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'green' }}>
                    <CircularProgress color='inherit' />
                    <Typography variant='body1' style={{ marginLeft: '10px' }}>
                      Loading comments...
                    </Typography>
                  </div>
                ) : null}
                <List>
                  {dataApi.comments.map(comment => (
           <React.Fragment key={comment.id}>
           <ListItem alignItems="flex-start">
             <ListItemText
               primary={
                 <>
                   <Typography
                     component="span"
                     variant="subtitle1"
                     color="textPrimary"
                     style={{ fontWeight: 'bold' }}
                   >
                     {userName(comment.user_id)}
                   </Typography>
                   <Typography
                     component="span"
                     variant="body2"
                     style={{ display: 'block', marginTop: '8px' }}
                   >
                     {comment.body}
                   </Typography>
                 </>
               }
               secondary={
                 <Typography
                   component="span"
                   variant="caption"
                   color="textSecondary"
                 >
                   Commented on: {new Date(comment.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                 </Typography>
               }
             />
           </ListItem>
           <Divider variant="inset" component="li" />
         </React.Fragment>
                  ))}
                </List>
              </Paper>
            )}
          </div>
         

          <CommentForm userId={userId} articleId={id} onCommentAdded={fetchComments} />
        </div>
      </div>
    </>
  )
}
