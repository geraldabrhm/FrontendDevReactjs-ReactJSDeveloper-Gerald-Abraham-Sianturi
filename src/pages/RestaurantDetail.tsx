import { useParams, useLocation } from "react-router-dom";
import Star from "../components/Star";
import { useState, useEffect } from "react";
import { getDetailRestaurant } from "../api/restaurant-api";
// import { arrayUnique } from "../utils/array-utils";


const RestaurantDetail = () => {
    const { id } = useParams();

    const [restaurantsPhotoList, setRestaurantsPhotoList] = useState<any>({});
    const [restaurantReview, setRestaurantReview] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [idxImage, setIdxImage] = useState<number>(0);
    const location = useLocation();
    const restaurantName = location.state?.name;
    const restaurantRating = location.state?.rating;

    useEffect(() => {
        if(id != undefined) {
            loadRestaurantDetails(id.toString());
        }
    }, []);

    useEffect(() => {
        console.info(restaurantsPhotoList); // HERE: A
    }, [restaurantsPhotoList])

    useEffect(() => {
        console.info(restaurantReview);
    }, [restaurantReview])

    const loadRestaurantDetails = (id: string) => {
        setIsLoading(true);
        const responseRestaurant = getDetailRestaurant(id);
        responseRestaurant.then((res: any) => {
            return res.data;
        }).then((data: any) => {
            setRestaurantsPhotoList(data.restaurant.photos);
            setRestaurantReview(data.restaurant.bestRating);
            console.info(data.restaurant.bestRating);
            // setRestaurantsPhotoList(arrayUnique(data.restaurant.photos.concat([...restaurantsPhotoList])));
        }).catch((err: any) => {
            console.error(err.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div>
            <section className="flex flex-col justify-start p-4">
                <h1 className="">{restaurantName}</h1>
                <div className="flex flex-row justify-start gap-2">
                    <Star starAmount={Math.floor(restaurantRating/2)}/>
                    <span className="text-sm text-[#888888]">{restaurantRating/2}</span>
                </div>
                <div className="min-h-[25vh]">
                    {
                        (isLoading == false && restaurantsPhotoList.length != 0) && 
                            <div className="flex flex-row justify-between">
                                <button onClick={() => {setIdxImage(idxImage - 1);}} className="p-2 hover:bg-[#888888] rounded-md">
                                    {"<"}
                                </button>
                                <div className="flex flex-row justify-center h-full">
                                    <img src={restaurantsPhotoList[(idxImage + restaurantsPhotoList.length) % restaurantsPhotoList.length].src} alt={restaurantName} className="object-fill rounded-md" draggable={false}/>
                                </div>
                                <button onClick={() => {setIdxImage(idxImage + 1)}} className="p-2 hover:bg-[#888888] rounded-md">
                                    {">"}
                                </button>
                            </div>
                    }
                    {
                        (isLoading == false && restaurantsPhotoList.length == 0) && 
                            <div className='flex flex-row justify-center w-screen'>
                                <h1>There is no photo posted by users</h1>
                            </div>
                    }
                    {
                        (isLoading == true) && 
                            <div className='flex flex-row justify-center w-screen'>
                                <h1>Loading...</h1>
                            </div>
                    }
                </div>
                <div className="min-h-[50vh] p-4">
                    {   
                        (isLoading == false) ?
                            (Object.keys(restaurantReview).length != 0) ? (
                                <div className="">
                                    <h2 className="font-bold text-lg">List of Reviews</h2>
                                    <div className="flex flex-row justify-start gap-2 bg-[#fde0e0] rounded-md p-4">
                                        <img src={restaurantReview.reviewer.avatar} alt="reviewer-vatar" className="w-28 h-28 rounded-md" draggable={false}/>
                                        <div className="flex flex-col justify-between">
                                            <div className="flex flex-row justify-start gap-2">
                                                <Star starAmount={Math.floor(restaurantReview.ratingValue / 2)}/>
                                                <span className="text-sm text-[#888888]">{restaurantReview.ratingValue / 2}/5</span>
                                            </div>
                                            <span className="italic">{restaurantReview.review.reviewBody}</span>
                                            <span className="font-semibold">- {restaurantReview.reviewer.firstName} {restaurantReview.reviewer.lastName}</span>
                                            
                                        </div>
                                    </div>
                                </div>

    
                            ) : (
                                <div className='flex flex-row justify-center w-screen'>
                                    <h2>List of Review</h2>
                                    <h1>There is no review by users</h1>
                                </div>
                            ) : (
                                <></>
                            )
                    }
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetail;