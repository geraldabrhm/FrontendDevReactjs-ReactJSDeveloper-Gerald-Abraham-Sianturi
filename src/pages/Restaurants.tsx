import { loremIpsum } from 'lorem-ipsum';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import RestaurantCard from '../components/RestaurantCard';
import { getAllRestaurants } from '../api/restaurant-api';
import { getPriceKeys, filterByOpenNow, filterByPriceCategory } from '../utils/price-utils';
import { arrayUnique } from '../utils/array-utils';
import { ALL } from '../constants/price-range';
import LoadingBox from '../components/LoadingBox';

const Restaurants = () => {
    const [restaurantsList, setRestaurantsList] = useState<any>([]);
    const [restaurantDisplayed, setRestaurantDisplayed] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFilterByOpenNow, setIsFilterByOpenNow] = useState<boolean>(false);
    const [pricePicked, setPricePicked] = useState<string>(ALL);
    // const [restaurantCategoryPicked, setRestaurantCategoryPicked] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<string>("1");

    let clearAllElmt: any;

    useEffect(() => {
        console.info("Load data for the first time");
        const checkboxElmt = document.getElementById("open-now") as HTMLInputElement;
        const priceSelectElmt = document.getElementById("price-select") as HTMLSelectElement;
        
        clearAllElmt = document.querySelector("#clear-all");

        clearAllElmt.addEventListener("click", () => {
            checkboxElmt.checked = false;
            priceSelectElmt.value = ALL;
            setIsFilterByOpenNow(false);
            setPricePicked(ALL);
        });        
    }, [])

    useEffect(() => {
        setFilteredData();
    }, [restaurantsList])

    useEffect(() => {
        console.info("Restaurant displayed changing: This is restaurant displayed:");
        console.info(restaurantDisplayed);
    }, [restaurantDisplayed])

    useEffect(() => {
        console.info("Current page changing");
        loadRestaurantData(currentPage);
        setFilteredData();
    }, [currentPage])

    useEffect(() => {
        console.info("Filter is changing");
        setFilteredData();
    }, [isFilterByOpenNow, pricePicked])

    const  loadRestaurantData = async (pageNumber: string) => {
        setIsLoading(true);
        const responseRestaurant = getAllRestaurants(pageNumber);
        responseRestaurant.then((res: any) => {
            return res.data;
        }).then((data: any) => {
            if(data != null) {
                if(currentPage == "1") {
                    console.info("Loading restaurant first page");
                    console.info(data);
                    flushSync(() => setRestaurantsList(data));
                } else {
                    const joinedList = restaurantsList.concat(data);
                    const joinedListUnique = arrayUnique(joinedList);
                    console.info(joinedListUnique);
                    flushSync(() => setRestaurantsList(joinedListUnique));
                }
            }
        }).catch((err: any) => {
            console.error(err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const setFilteredData = () => {
        console.info("=== DO FILTERING ===")
        console.info("Restaurant list data");
        console.info(restaurantsList);

        setRestaurantDisplayed(restaurantsList);
        
        let filteredData = restaurantsList;
        if(isFilterByOpenNow == true) {
            console.info("Only show open now restaurant");
            filteredData = filterByOpenNow(restaurantsList);
            setRestaurantDisplayed(filteredData);
        }

        if(pricePicked != ALL) {
            console.info("only show restaurant with price category " + pricePicked);
            filteredData = filterByPriceCategory(filteredData, pricePicked);
            setRestaurantDisplayed(filteredData);
        }
        console.info("Restaurant filtered data");
        console.info(filteredData);
    }

    const handleLoadMore = () => {
        setCurrentPage((parseInt(currentPage) + 1).toString());
    }

    return (
        <>
            <h3 id="restaurants-page-desc" className="p-2 text-[#888888]">
                {loremIpsum({count: 3})}
            </h3>
            <hr/>
            <section id="restaurants-list-nav-tool" className='flex flex-row justify-between items-center p-2'>
                <form className='flex flex-row justify-start gap-3 items-center'>
                    <label>Filter by: </label>
                    <div className="border-b p-1">
                        <input type="checkbox" id="open-now" name="open-now" onChange={(e) => {
                            setIsFilterByOpenNow(e.target.checked);
                        }}/>
                        <span className='p-1'>Open Now</span>
                    </div>
                    <div className="border-b p-1">
                        <select id="price-select" className='p-1 bg-white' onChange={(e) => {
                            setPricePicked(e.target.value);
                        }}>
                            <option value={ALL}>All</option>
                            {
                                getPriceKeys().map((priceKey: string) => {
                                    return (
                                        <option key={priceKey} value={priceKey}>{priceKey}</option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    {/* <div className="border-b p-1">
                        <select className='p-1 bg-white'>
                            <option value={ALL}>All</option>
                        </select>
                    </div> */}
                </form>
                <button id="clear-all">
                    Clear all
                </button>
            </section>
            <hr/>
            <section id="restaurants-list" className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 justify-between">
                {
                    isLoading == false ? (
                        restaurantDisplayed.length != 0 ? (
                            restaurantDisplayed.map((restaurant: any) => {
                                return (
                                    <RestaurantCard key={restaurant.id} id={restaurant.id} imageSrc={restaurant.mainPhotoSrc} name={restaurant.name} rating={restaurant.aggregateRatings.thefork.ratingValue} category={restaurant.servesCuisine} priceRange={restaurant.priceRange} isOpen={restaurant.isInsider}/>
                                )
                            })
                        ): (
                            <div className='flex flex-row justify-center w-screen'>
                                <h1>There is no restaurant found with your current prompt filter</h1>
                            </div>
                        )
                    ) : (
                        <>
                            <LoadingBox/>
                            <LoadingBox/>
                            <LoadingBox/>
                            <LoadingBox/>
                            <LoadingBox/>
                            <LoadingBox/>
                            <LoadingBox/>
                            <LoadingBox/>
                        </>
                    )

                }
            </section>
            { (isLoading == false && restaurantDisplayed.length != 0) &&
                <div className='flex flex-row justify-center w-screen'>
                    <button className="bg-white text-[#0a275c] px-4 py-2 mb-2 rounded-md w-1/2 border-[#0a275c] border-2" onClick={() => handleLoadMore()}>Load More</button>
                </div>
            }
        </>
    )
}

export default Restaurants;