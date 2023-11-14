import toast from "react-hot-toast";
import { useAppDispatch, useUpdateShortlist } from "src/@core/hooks/hooks";
import { selectedPostFiltred } from "src/store/features/posts/postsSlice";

interface ThumbUpIconProps {
    id?: number;
}

export default function ThumbUpIcon({id}:ThumbUpIconProps) {
    const dispatch = useAppDispatch()
    const { updateShortlist } = useUpdateShortlist();
    const handleShortlist = async (id: number)=>{
        dispatch(selectedPostFiltred(id));
        toast.success('Item is shortlisting')
        await updateShortlist(id)
      }
  return (
    <div className="icon" onClick={() =>id && handleShortlist(id)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
      </svg>
    </div>
  );
}
