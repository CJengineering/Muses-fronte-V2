import { Button, FormControl, TextField } from '@mui/material'
import { FormEvent, useState } from 'react'
interface CommentFormProps {
  userId?: number 
  articleId: number
  onCommentAdded: () => void
}
export default function CommentForm({ userId, articleId, onCommentAdded }: CommentFormProps) {
  const [body, setBody] = useState('')
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: body,
          user_id: userId,
          post_id: articleId
        })
      })

      if (response.ok) {
        // Comment created successfully
        console.log('Comment created!')
        setBody('')
        onCommentAdded()
      } else {
        // Handle error if needed
        console.error('Error creating comment:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin='normal'>
        <TextField
          id='body'
          name='body'
          label='Comment'
          multiline
          rows={2}
          value={body}
          onChange={e => setBody(e.target.value)}
          variant='outlined'
          required
        />
      </FormControl>

      <input type='hidden' name='user_id' value={userId} />
      <input type='hidden' name='post_id' value={articleId} />

      <Button type='submit' variant='contained' color='primary'>
        send
      </Button>
    </form>
  )
}
