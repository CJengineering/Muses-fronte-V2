import toast from "react-hot-toast";
import { useSlack } from "src/@core/hooks/hooks";

export interface SlackIconProps {
    keyword: string;
    link:string;
  }
export default function SlackIcon({keyword,link}: SlackIconProps) {
    const { sendSlackMessage } = useSlack();
    const sendSlack = async (keyword: string, link:string) => {
      toast.success('Item sent to slack!');
        await sendSlackMessage(keyword, link);
      };
  return (
    <div className="icon" onClick={() => sendSlack(keyword,link)}>
    <span className="material-symbols-outlined">tag</span>
  </div>
  )
}
