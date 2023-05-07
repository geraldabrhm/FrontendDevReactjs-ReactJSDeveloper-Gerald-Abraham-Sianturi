import { getPriceSymbol } from "../utils/price-utils";
import ColoredCircle from "./ColoredCircle";
import Star from '../components/Star';
import { Link } from "react-router-dom";

const RestaurantCard = ({ id, imageSrc, name, rating, category, priceRange, isOpen }: any) => {
    return (
        <div data-cy="restaurant-item" className="flex flex-col justify-start [&>*]:mb-3">
            <img src={imageSrc} alt={name} className="w-full h-52 rounded-md" draggable={false}/>
            <div className="flex flex-col justify-start">
                <span className="font-semibold text-xl truncate">{name}</span>
                <Star starAmount={Math.floor(rating/2)}/>
                <div className="flex flex-row justify-between items-center text-[#888888]">
                    <span className="text-sm">{category} - {getPriceSymbol(priceRange)}</span>
                    <div className="flex flex-row justify-end items-center [&>*]:ml-1">
                        <ColoredCircle color={isOpen ? "green-400" : "red-500" }/>
                        <span className="text-sm">{isOpen ? "Open Now" : "Closed"}</span>
                    </div>
                </div>
            </div>
            <Link to={`/restaurant/${id}`} state={{name, rating, imageSrc}} className="flex flex-row justify-center w-full">
                <button className="bg-[#0a275c] text-white p-2 rounded-md w-full">Learn More</button>
            </Link>
        </div>
    )
}

export default RestaurantCard;