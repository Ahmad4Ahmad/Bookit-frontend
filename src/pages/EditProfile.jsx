import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function EditProfile()
{
    const {user, loading} = useContext(AuthContext);
    const initialState = 
    {
        name: user?.username,
        email: user?.email,
        phone: user?.phone || "",
        birth: user?.birth || {},
        country: user?.country || "",
        city: user?.city || "",
        gender: user?.gender || "",
        img: user?.img
    };

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");
    const navigate = useNavigate();
    const handleChange = (event) =>
    {
        const {id, value} = event.target;
        setProfile({...profile, [id]: value});
    };

    const handleImageChange = (event) =>
    {
        setProfileImage(event.target.files[0]);
    };

    const saveProfile = async (event) =>
    {
        event.preventDefault();
        try
        {
            let imageURL;
            if (profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png"))
            {
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", "dvhclgitc");
                image.append("upload_preset", "rtllee3x");
                image.append("folder", "/Bookit/users");
                const response = await fetch("https://api.cloudinary.com/v1_1/dvhclgitc/image/upload/", {method: "post", body: image});
                const imgData = await response.json();
                imageURL = imgData.url.toString();
            }
            const formData = 
            {
                name: profile.name,
                email: profile.email,
                phone: profile.phone,
                birth: profile.birth,
                country: profile.country,
                city: profile.city,
                gender: profile.gender,
                img: profileImage ? imageURL : profile.img
            };

            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${user._id}`, formData);
            navigate("/profile");
        }
        catch (error)
        {
            console.error(error);
        }
    };

    return (
        <div className="pl-10">
            <div className=" flex justify-between w-4/5 mb-8">
                <h1 className="my-4  text-3xl block">Personal Details</h1>
            </div>
            <ul className="w-4/5">
                <li className="border-y border-solid border-gray-200 w-full p-3">
                    <label htmlFor="name" className="text-sm">Name: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your username" id="name" onChange={handleChange} value={profile.name} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="email" className="text-sm">Email address: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your email address" id="email" onChange={handleChange} value={profile.email} type="email" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="phone" className="text-sm">Phone number: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your phone number" id="phone" onChange={handleChange} value={profile.phone} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="birth" className="text-sm">Date of birth: </label>
                    <span><input className="ml-2 outline-none h-8" placeholder="Enter your birth date" id="birth" onChange={handleChange} value={profile.birth} type="date" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="country" className="text-sm">Country: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your country" id="country" onChange={handleChange} value={profile.country} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="city" className="text-sm">City: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your city" id="city" onChange={handleChange} value={profile.city} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="gender" className="text-sm">Gender: </label>
                    <span><input className="ml-2 focus:outline focus:outline-2 focus:outline-blue-700 rounded outline outline-1 h-8 p-2.5" placeholder="Enter your gender" id="gender" onChange={handleChange} value={profile.gender} type="text" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <label htmlFor="img" className="text-sm">User image: </label>
                    <span><input className="ml-2 outline-none h-8" id="img" onChange={handleImageChange} type="file" /></span>
                </li>
                <li className="border-b border-solid border-gray-200 w-full p-3">
                    <button disabled={loading} className="border-none py-2.5 px-5 bg-blue-700 text-white font-bold cursor-pointer rounded disabled:bg-gray-600 disabled:cursor-not-allowed" onClick={saveProfile}>Edit</button>
                </li>
            </ul>
        </div>
    );
}