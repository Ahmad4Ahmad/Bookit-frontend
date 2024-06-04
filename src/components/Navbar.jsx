import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar()
{
    const navigate = useNavigate();
    const {user, dispatch} = useContext(AuthContext);

    const logoutUser = async () =>
    {
        try
        {
            dispatch({type: "LOGOUT"});
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
            navigate("/");
        }
        catch(error)
        {
            const message = (error.response && error.response.data && error.response.data.message) || 
            error.message || error.toString();
        }
    };

    return (
        <div className="navbar h-12 bg-sky-900 flex justify-center">
            <div className="navContainer w-full max-w-5xl text-neutral-50 flex items-center justify-between">
                <Link to={"/"} className="no-underline text-inherit">
                    <span className="logo font-medium">Bookit</span>
                </Link>
                {user ? 
                <div>
                    <Link to={"/profile"}>{user.username}</Link>
                    <button onClick={logoutUser} className="navButton rounded bg-white text-sky-900 cursor-pointer py-1.5 px-2.5 ml-5 text-sm leading-5">Logout</button>
                </div>
                    : 
                <div>
                    <Link to={"/register"}>
                        <button className="navButton rounded bg-white text-sky-900 cursor-pointer py-1.5 px-2.5 ml-5 text-sm leading-5">Register</button>
                    </Link>
                    <Link to={"/login"}>
                        <button className="navButton rounded bg-white text-sky-900 cursor-pointer py-1.5 px-2.5 ml-5 text-sm leading-5">Login</button>
                    </Link>
                </div>}
            </div>
        </div>
    );
}