import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register()
{
    const [credentials, setCredentials] = useState({username: undefined, email: undefined, password: undefined});
    const {loading, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (event) =>
    {
        setCredentials((prev) =>
        {
            return {...prev, [event.target.id]: event.target.value};
        });
    };

    const handleClick = async (event) =>
    {
        event.preventDefault();
        try
        {
            const res = await axios.post("http://localhost:8800/api/auth/register", credentials);
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details});
            navigate("/");
        }
        catch (error)
        {
            console.error(error);
        }
    };

    return (
        <>
            <div className="navbar h-14 bg-sky-900 flex justify-center">
                <div className="navContainer w-full max-w-5xl text-neutral-50 flex items-center justify-between">
                    <Link to={"/"} className="no-underline text-inherit">
                        <span className="logo font-medium">Bookit</span>
                    </Link>
                </div>
            </div>
            <div className="h-screen items-center justify-center flex">
                <div className="w-1/4 flex flex-col gap-2.5">
                    <label htmlFor="username" className="text-sm">Username</label>
                    <input className="focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your username" id="username" onChange={handleChange} type="text" />
                    <label htmlFor="email" className="text-sm mt-3">Email Address</label>
                    <input className="focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your email address" id="email" onChange={handleChange} type="email" />
                    <label htmlFor="password" className="text-sm mt-3">Password</label>
                    <input className="focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your password" id="password" onChange={handleChange} type="password" />
                    {/* <label htmlFor="confirm" className="text-sm mt-3">Confirm Password</label>
                    <input className="focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="confirm your password" id="confirm" onChange={handleChange} type="password" /> */}
                    <button disabled={loading} className="border-none mt-5 py-2.5 px-5 bg-blue-700 text-white font-bold cursor-pointer rounded disabled:bg-gray-600 disabled:cursor-not-allowed" onClick={handleClick}>Register</button>
                    {error && <span>{error.message}</span>}
                </div>
            </div>
        </>
    );
}