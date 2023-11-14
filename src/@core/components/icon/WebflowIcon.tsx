import toast from 'react-hot-toast'
import { useWebflow } from 'src/@core/hooks/hooks'

export interface WebflowIconProps {
  link?: string
  id?: number
}

export default function WebflowIcon({ link, id }: WebflowIconProps) {
  const { handleWebflow } = useWebflow()
  const webflow = async (link: string, id: number) => {
    toast.success('Item is sending to Webflow');
    await handleWebflow(link, id)
  }

  return (
    <div className='icon' onClick={() => link && typeof id === 'number' && webflow(link, id)}>
      <svg
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 24 24'
        xmlSpace='preserve'
      >
        <path
          d='M12,3c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S17,3,12,3z M15.3,13.7c-0.4,1-1.2,1.9-2.6,1.9c0,0-0.6-4.1-0.6-4.2
	c0,0.1-0.9,2.3-0.9,2.3c-0.4,1-1.1,1.9-2.5,2L7.6,8.9c0.9,0,2,0.7,2.1,2c0,0,0.1,2.4,0.1,2.6c0.1-0.2,1-2.7,1-2.7c0.4-1,1.1-2,2.4-2
	c0,0,0.6,4.4,0.6,4.6c0.1-0.2,0.8-2.7,0.8-2.7c0.4-1,1.1-2,2.5-2L15.3,13.7z'
        />
      </svg>
    </div>
  )
}
