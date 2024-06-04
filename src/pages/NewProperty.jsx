import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function NewProperty()
{
    const [images, setImages] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => 
    {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = (event) => 
    {
        const isChecked = event.target.checked;
        const option = event.target.value;
        const selectedOptionSet = new Set(rooms);
        if (isChecked) 
        {
            selectedOptionSet.add(option);
        } 
        else 
        {
            selectedOptionSet.delete(option);
        }

        const newSelectedOptions = Array.from(selectedOptionSet);
        setRooms(newSelectedOptions);
    };

    const addProperty = async (event) => 
    {
        event.preventDefault();
        try 
        {
            const list = await Promise.all(Object.values(images).map(async (file) => 
            {
                const data = new FormData();
                data.append("file", file);
                data.append("cloud_name", "dvhclgitc");
                data.append("upload_preset", "rtllee3x");
                data.append("folder", "/Bookit/properties");
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvhclgitc/image/upload/", data);
                const { url } = uploadRes.data;
                return url;
            }));

            const newhotel = 
            {
                user,
                ...info,
                rooms,
                photos: list,
            };

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/hotels/`, newhotel, { withCredentials: true });
            navigate("/properties");
        } 
        catch (error) 
        {
            console.log(error)
        }
    };
    
    return (
        <div className="pl-10">
            <div className=" flex justify-between w-4/5 mb-8">
                <h1 className="my-4  text-3xl block">Add new property</h1>
            </div>
            <ul className="w-4/5">
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="img" className="text-sm">Images: </label>
                    <span><input multiple className="ml-2 outline-none h-8" id="img" onChange={(event) => setImages(event.target.files)} type="file" /></span>
                </li>
                <li className="border-y border-solid border-gray-200 w-full p-3">
                    <label htmlFor="name" className="text-sm">Name: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Name your property" id="name" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="type" className="text-sm">Type: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="The property type" id="type" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="city" className="text-sm">City: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="The city where the property is located" id="city" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="address" className="text-sm">Address: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="The property address" id="address" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="distance" className="text-sm">Distance: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Distance from city center" id="distance" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="description" className="text-sm">Description: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Property Description" id="description" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="price" className="text-sm">Price: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="The price" id="price" onChange={handleChange} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="rooms" className="text-sm">Rooms: </label>
                    <span className="inline-block w-[95%]">
                        <div className="flex justify-between ml-2 rounded outline outline-1 p-1 focus:outline focus:outline-2 focus:outline-blue-700" onChange={handleChange} id="rooms">
                            <div className="flex flex-col flex-1">
                                <span><input onChange={handleSelect} type="checkbox" value={"Single Room"}></input> Single Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Double Room"}></input> Double Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Triple Room"}></input> Triple Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Quad Bedroom"}></input> Quad Bedroom</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Hollywood Twin"}></input> Hollywood Twin</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Queen Room"}></input> Queen Room</span>
                            </div>
                            <div className="flex flex-col flex-1">
                                <span><input onChange={handleSelect} type="checkbox" value={"Twin Room"}></input> Twin Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"King Room"}></input> King Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Double - Double Hotel Room"}></input> Double - Double Hotel Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Studio Hotel Room"}></input> Studio Hotel Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Accessible Room"}></input> Accessible Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Suite"}></input> Suite</span>
                            </div>
                            <div className="flex flex-col flex-1">
                                <span><input onChange={handleSelect} type="checkbox" value={"Mini-Suite"}></input> Mini-Suite</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Apartment Style Hotels"}></input> Apartment Style Hotels</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Standard Room Hotel Room"}></input> Standard Room Hotel Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Connecting Rooms"}></input> Connecting Rooms</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Presidential Suite"}></input> Presidential Suite</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Deluxe Room"}></input> Deluxe Room</span>
                            </div>
                            <div className="flex flex-col flex-1">
                                <span><input onChange={handleSelect} type="checkbox" value={"Super deluxe"}></input> Super deluxe</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Joint Room"}></input> Joint Room</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Cabana Rooms"}></input> Cabana Rooms</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Villas"}></input> Villas</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Penthouse Suites"}></input> Penthouse Suites</span>
                                <span><input onChange={handleSelect} type="checkbox" value={"Floored Room / Executive Floor"}></input> Floored Room / Executive Floor</span>
                            </div>
                        </div>
                    </span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="featured" className="text-sm">Featured: </label>
                    <span>
                        <select className="ml-2 rounded outline outline-1 p-1 focus:outline focus:outline-2 focus:outline-blue-700" onChange={handleChange} id="featured">
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="children" className="text-sm">Allow children: </label>
                    <span>
                        <select className="ml-2 rounded outline outline-1 p-1 focus:outline focus:outline-2 focus:outline-blue-700" onChange={handleChange} id="children">
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="pet" className="text-sm">Allow pets: </label>
                    <span>
                        <select className="ml-2 rounded outline outline-1 p-1 focus:outline focus:outline-2 focus:outline-blue-700" onChange={handleChange} id="pet">
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <button className="border-none py-2.5 px-5 bg-blue-700 text-white font-bold cursor-pointer rounded disabled:bg-gray-600 disabled:cursor-not-allowed" onClick={addProperty}>Add property</button>
                </li>
            </ul>
        </div>
    );    
}