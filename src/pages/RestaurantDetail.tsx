import { useParams, useLocation } from "react-router-dom";
import Star from "../components/Star";
import { useState, useEffect } from "react";
import { getDetailRestaurant, getReviewList } from "../api/restaurant-api";
import { IMG_DEFAULT }from '../constants/placeholder';
import ReviewList from "../components/ReviewList";
import LoadingReview from "../components/LoadingReview";


const RestaurantDetail = () => {
    const { id } = useParams();

    const [restaurantsPhotoList, setRestaurantsPhotoList] = useState<any>({});
    const [restaurantBestReview, setRestaurantBestReview] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reviewList, setReviewList] = useState<any>([]);
    const [isLoadingReviewList, setIsLoadingReviewList] = useState<boolean>(true);
    const [idxImage, setIdxImage] = useState<number>(0);
    const location = useLocation();
    const restaurantName = location.state?.name;
    const restaurantRating = location.state?.rating;

    useEffect(() => {
        if(id != undefined) {
            loadRestaurantDetails(id.toString());
            loadReviewList(id.toString());
        }
    }, []);

    const loadRestaurantDetails = (id: string) => {
        setIsLoading(true);
        const responseRestaurant = getDetailRestaurant(id);
        responseRestaurant.then((res: any) => {
            return res.data;
        }).then((data: any) => {
            setRestaurantsPhotoList(data.restaurant.photos);
            setRestaurantBestReview(data.restaurant.bestRating);
            // console.info(data.restaurant.bestRating); // ! Debug
        }).catch((err: any) => {
            console.error(err.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const loadReviewList = (id: string) => {
        setIsLoadingReviewList(true);
        const responseRestaurant = getReviewList(id);
        responseRestaurant.then((res: any) => {
            return res.data;
        }).then((data: any) => {
            console.info(data.restaurantRatingsList.ratings);
            setReviewList(data.restaurantRatingsList.ratings);
            // setReviewList("");
        }).catch((err: any) => {
            console.error(err.message);
        }).finally(() => {
            setIsLoadingReviewList(false);
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
                <div className="min-h-[25vh] bg-[#f8f4f1] rounded-md">
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
                        <div className="rounded-md p-4 max-w-sm w-full mx-auto">
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-28 bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {/* <div className="min-h-fit p-4">
                    <h2 className="font-bold text-lg">Review with best rating</h2>
                    {   
                        (isLoading == false) ?
                            (Object.keys(restaurantBestReview).length != 0) ? (
                                <ReviewList avatarImg={restaurantBestReview.reviewer.avatar} ratingScale10={restaurantBestReview.ratingValue} reviewText={restaurantBestReview.review.reviewBody} reviewerfirstName={restaurantBestReview.reviewer.firstName} reviewerLastName={restaurantBestReview.reviewer.reviewerLastName} />
    
                            ) : (
                                <div className='flex flex-row justify-center w-screen'>
                                    <h2>Review with best rating</h2>
                                    <h1>There is no review by users</h1>
                                </div>
                            ) : (
                                <LoadingReview />
                            )
                    }
                </div> */}
                <div className="min-h-fit p-4">
                    <h2 className="font-bold text-lg">List of Reviews</h2>
                    {   
                        (isLoadingReviewList == false) ?
                            (reviewList.length != 0) ? (
                                reviewList.map((review: any) => {
                                    return (
                                        <ReviewList key={review.id} avatarImg={review.reviewer.avatar} ratingScale10={review.ratingValue} reviewText={review.review.reviewBody} reviewerfirstName={review.reviewer.firstName} reviewerLastName={review.reviewer.reviewerLastName} />
                                    )
                                })
    
                            ) : (
                                <div className='flex flex-row justify-center w-screen'>
                                    <h2>List of Reviews</h2>
                                    <h1>There is no review by users</h1>
                                </div>
                            ) : (
                                <LoadingReview />
                            )
                    }
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetail;