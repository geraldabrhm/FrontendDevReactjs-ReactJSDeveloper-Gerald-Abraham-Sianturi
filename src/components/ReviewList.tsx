import { IMG_DEFAULT }from '../constants/placeholder';
import Star from './Star';

const ReviewList = ({avatarImg, ratingScale10, reviewText, reviewerfirstName, reviewerLastName}: any) => {
    return (
        <div className="flex flex-row justify-start gap-2 bg-[#f8f4f1] rounded-md p-4 mb-2">
            <img src={avatarImg == "https://graph.facebook.comnull/" ? IMG_DEFAULT : avatarImg} alt="reviewer-vatar" className="w-28 h-28 rounded-md" draggable={false}/>
            <div className="flex flex-col justify-between">
                <div className="flex flex-row justify-start gap-2">
                    <Star starAmount={Math.floor(ratingScale10 / 2)}/>
                    <span className="text-sm text-[#888888]">{ratingScale10 / 2}/5</span>
                </div>
                <span className="italic">{reviewText}</span>
                <span className="font-semibold">- {reviewerfirstName} {reviewerLastName}</span>
            </div>
        </div>
    )
}

export default ReviewList;