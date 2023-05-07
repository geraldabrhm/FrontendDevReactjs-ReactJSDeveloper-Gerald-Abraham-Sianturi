import { loremIpsum } from 'lorem-ipsum';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import RestaurantCard from '../components/RestaurantCard';
import { getAllRestaurants } from '../api/restaurant-api';
import { getPriceCategory, getPriceKeys } from '../utils/price-utils';
import { arrayUnique } from '../utils/array-utils';
import { ALL } from '../constants/price-range';

const Restaurants = () => {
    const [restaurantsList, setRestaurantsList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFilterByOpenNow, setIsFilterByOpenNow] = useState<boolean>(false);
    const [pricePicked, setPricePicked] = useState<string>("");
    // const [restaurantCategoryPicked, setRestaurantCategoryPicked] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<string>("1");

    let checkboxElmt: any;
    let priceSelectElmt: any;

    useEffect(() => {
        setIsLoading(true);
    }, [])

    useEffect(() => {
        // Handle checkbox
        const checkboxHandler = () => {
            setIsFilterByOpenNow(!isFilterByOpenNow);
        }

        checkboxElmt = document.querySelector('#open-now') as HTMLInputElement;
        if(checkboxElmt != null) {
            console.info(checkboxElmt);
            checkboxElmt.addEventListener('change', checkboxHandler)
        } else {
            console.error("checkboxElmt is null");
        }

        // Handle price select
        const priceHandler = (elmt: any) => {
            setPricePicked(elmt.value.toString());
        }
        
        priceSelectElmt = document.querySelector('#price-select') as HTMLSelectElement;

        if(priceSelectElmt != null) {
            priceSelectElmt.addEventListener('change', () => priceHandler(priceSelectElmt))
        } else {
            console.error("priceSelectElmt is null");
        }
        return () => {
            if(checkboxElmt != null) {
                checkboxElmt.removeEventListener('change', checkboxHandler);
            }
            if(priceSelectElmt != null) {
                priceSelectElmt.removeEventListener('change', () => priceHandler(priceSelectElmt));
            }
        }
    }, [isFilterByOpenNow, pricePicked])

    useEffect(() => {
        loadRestaurantData(currentPage);
    }, [isFilterByOpenNow, pricePicked, currentPage])
    // }, [currentPage])

    // useEffect(() => {
    //     setIsLoading(false);
    // }, [restaurantsList])

    const  loadRestaurantData = async (pageNumber: string) => {
        setIsLoading(true);
        const responseRestaurant = getAllRestaurants(pageNumber);
        responseRestaurant.then((res: any) => {
            return res.data;
        }).then((data: any) => {
            if(data != null) {
                if(currentPage == "1") {
                    console.info("Load data for the first time");
                    console.info(data);
                    flushSync(() => setRestaurantsList(data));
                } else {
                    const joinedList = restaurantsList.concat(data);
                    const joinedListUnique = arrayUnique(joinedList);
                    console.info(joinedListUnique);
                    flushSync(() => setRestaurantsList(joinedListUnique));
                }
                
                if(checkboxElmt.checked) {
                    const filteredData = filterByOpenNow(restaurantsList);
                    console.info("Filtered data with checkbox")
                    console.info(filteredData);
                    flushSync(() => setRestaurantsList(arrayUnique(filteredData)));
                }
            
                if(priceSelectElmt.value != ALL) {
                    const filteredData = filterByPriceCategory(restaurantsList, priceSelectElmt.value);
                    console.info("Filtered data with price select")
                    console.info(filteredData);
                    flushSync(() => setRestaurantsList(arrayUnique(filteredData)));
                };
            }
        }).catch((err: any) => {
            console.error(err.message);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const filterByOpenNow = (arr: any) => {
        return arr.filter((elmt: any) => {
            return elmt.isInsider == true;
        })
    }

    const filterByPriceCategory = (arr: any, priceCategory: string) => {
        return arr.filter((elmt: any) => {
            return getPriceCategory(elmt.priceRange) == priceCategory;
        })
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
                        <input type="checkbox" id="open-now" name="open-now"/>
                        <span className='p-1'>Open Now</span>
                    </div>
                    <div className="border-b p-1">
                        <select id="price-select" className='p-1 bg-white'>
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
                <button onClick={() => {
                    if(checkboxElmt != undefined) {
                        checkboxElmt.checked = false;
                        setIsFilterByOpenNow(false);
                    }
                    if(priceSelectElmt != undefined) {
                        priceSelectElmt.value = ALL;
                        setPricePicked(ALL);
                    }
                }}>
                    Clear all
                </button>
            </section>
            <hr/>
            <section id="restaurants-list" className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 justify-between">
                {
                    isLoading == false ? (
                        restaurantsList.length != 0 ? (
                            restaurantsList.map((restaurant: any) => {
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
                        <div className='flex flex-row justify-center w-screen'>
                            <h1>Loading...</h1>
                        </div>
                    )

                }
            </section>
            { (isLoading == false && restaurantsList.length != 0) &&
                <div className='flex flex-row justify-center w-screen'>
                    <button className="bg-white text-[#0a275c] px-4 py-2 mb-2 rounded-md w-1/2 border-[#0a275c] border-2" onClick={() => handleLoadMore()}>Load More</button>
                </div>
            }
        </>
    )
}

export default Restaurants;