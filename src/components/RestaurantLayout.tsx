import { Link, Outlet } from "react-router-dom";

const RestaurantLayout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/restaurant">
                            <h1 className="p-2">Restaurant</h1>
                        </Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default RestaurantLayout;