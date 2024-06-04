import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Properties()
{
    const [properties, setProperties] = useState([]);
    const {user} = useContext(AuthContext);
    let userProperties = useFetch(`${import.meta.env.VITE_BACKEND_URL}/hotels/properties/${user._id}`);
    useEffect(() =>
    {
        const fetchData = async () =>
        {
            setProperties(await Promise.all(userProperties.data.map(async (property) =>
            {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotels/${property}`);
                return res.data;
            })));
        }

        fetchData();
    }, [userProperties.data]);

    const deleteProperty = async (id) =>
    {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/hotels/delete/${id}`);
        setProperties(properties.filter(property => property._id !== id));
    };
    
    return (
        <div className="pl-10">
            <div className=" flex justify-between w-4/5 mb-8">
                <h1 className="my-4  text-3xl block">Your properties</h1>
            </div>
            <ul className="w-4/5">
                {properties.map((item) =>
                {
                    return (
                        <li key={item._id} className="relative border-y border-solid border-gray-200 w-full p-3">
                            <Link to={`/hotels/${item._id}`}><span className="ml-2 text-sm">{item.name}</span></Link>
                            <Link to={`/edit-property/${item._id}`}><button className="rounded-md absolute right-24 cursor-pointer px-3 py-1 font-medium text-white bg-blue-700">Edit</button></Link>
                            <button onClick={() => deleteProperty(item._id)} className="rounded-md absolute right-5 cursor-pointer px-3 py-1 font-medium text-white bg-red-700">Delete</button>
                        </li>)
                })}
            </ul>
        </div>
    );
}