import { Link, NavLink } from "react-router-dom";

export default function Sidebar()
{
    return (
        <div className="flex-1 border-r border-r-slate-200 border-solid min-h-screen bg-white">
            <div className="h-12 flex items-center justify-center">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="text-xl font-bold text-sky-900">Bookit</span>
                </Link>
            </div>
            <hr className="h-0 border-r border-r-slate-200 border-solid" />
            <div className="pl-2.5">
                <ul className="list-none m-0 p-0">
                    <NavLink to={"/profile"}>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-gray-300">
                            <span className="text-xs font-semibold text-gray-600 ml-2.5">Profile</span>
                        </li>
                    </NavLink>
                    <NavLink to={"/edit"}>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-gray-300">
                            <span className="text-xs font-semibold text-gray-600 ml-2.5">Edit Profile</span>
                        </li>
                    </NavLink>
                    <NavLink to={"/new"}>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-gray-300">
                            <span className="text-xs font-semibold text-gray-600 ml-2.5">List New Property</span>
                        </li>
                    </NavLink>
                    <NavLink to={"/properties"}>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-gray-300">
                            <span className="text-xs font-semibold text-gray-600 ml-2.5">Your properties</span>
                        </li>
                    </NavLink>
                    <NavLink to={"/bookings"}>
                        <li className="flex items-center p-1 cursor-pointer hover:bg-gray-300">
                            <span className="text-xs font-semibold text-gray-600 ml-2.5">Your Bookings</span>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};