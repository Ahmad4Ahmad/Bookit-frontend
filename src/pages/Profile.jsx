import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile()
{
    const {user} = useContext(AuthContext);
    const {data} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/users/${user._id}`);
    const date = new Date(data.birth);
    const formattedDate = date.toLocaleDateString('en-GB', 
    {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '.');

    return (
        <div className="pl-10 mt-4">
            <div className=" flex justify-between w-4/5 mb-8">
                <h1 className="my-4  text-3xl block">Personal Details</h1>
                <img className="block border border-solid border-gray-200 h-20 w-20 rounded-full cursor-pointer" src={data.img} alt="user image" />
            </div>
            <ul className="w-4/5">
                <li className="border-y border-solid border-gray-200 w-full p-3">
                    <span>Name: {data.username ? data.username : ""}</span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <span>Email address: {data.email ? data.email : ""}</span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <span>Phone number: {data.phone ? data.phone : ""}</span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <span>Date of birth: {data.birth ? formattedDate : ""}</span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <span>Country: {data.country ? data.country : ""}</span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <span>City: {data.city ? data.city : ""}</span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <span>Gender: {data.gender ? data.gender : ""}</span>
                </li>
            </ul>
        </div>
    );
}