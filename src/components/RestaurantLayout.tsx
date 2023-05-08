import { Link, Outlet } from "react-router-dom";

const RestaurantLayout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/restaurant">
                            <span className="font-bold text-xl text-black p-2 hover:bg-black hover:text-white w-fit-content">Restaurant</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default RestaurantLayout;