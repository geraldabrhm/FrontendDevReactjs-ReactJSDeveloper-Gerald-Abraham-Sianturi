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
    const location = useLocation();
    const restaurantName = location.state?.name;
    const restaurantRating = location.state?.rating;
    const restaurantImage = location.state?.imageSrc;

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
                <div className="min-h-[50vh]">
                    <img src={restaurantImage} alt="restaurant-img" className="w-52 h-52 rounded-md" draggable={false}/>
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
                                            <span>{restaurantReview.review.reviewBody}</span>
                                            <span>{restaurantReview.reviewer.firstName}</span>
                                            
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
                <div className="min-h-[50vh]">
                    {
                        (isLoading == false) ? (
                            (restaurantsPhotoList.length != 0) ? (
                                restaurantsPhotoList.map((elmt: any, idx: any) => {
                                    <div>
                                        <img key={idx} src={elmt.src} alt={restaurantName} className="w-52 h-52 rounded-md" draggable={false}/>
                                        <div>
                                            <p key={idx}>{elmt.src}</p>
                                        </div>
                                    </div>
                                })
                            ) : (
                                <div className='flex flex-row justify-center w-screen'>
                                    <h1>There is no photo posted by users</h1>
                                </div>
                            )
                        ) : (
                            <div className='flex flex-row justify-center w-screen'>
                                <h1>Loading...</h1>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetail;