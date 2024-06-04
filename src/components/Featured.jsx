import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContex";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Featured()
{
    const {data, loading} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/hotels/countByCity?cities=jerusalem,telaviv,eilat`);
    const {dispatch} = useContext(SearchContext);
    const navigate = useNavigate();
    const options = {adult: 1, children: 0, room: 1};
    const dates = [{startDate: new Date(), endDate: new Date(), key: "selection"}]

    const handleSearch = (destination) =>
    {
        dispatch({type: "New_SEARCH", payload: {destination, dates, options}});
        navigate("/hotels", {state: {destination}});
    };

    return (
        <div className="featured z-10 gap-5 justify-between flex w-full max-w-5xl">
            {loading ? "Loading" : <>
                <div onClick={() => handleSearch("jerusalem")} className="h-64 flex-1 overflow-hidden rounded-xl text-white relative cursor-pointer">
                    <img className="object-cover h-full w-full" src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713114593/Bookit/assets/Jerusalem-Old-City-skyline_jhyyux.jpg" alt="jerusalim" />
                    <div className="left-5 bottom-5 absolute">
                        <h1>Jerusalem</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>
                <div onClick={() => handleSearch("telaviv")} className="h-64 flex-1 overflow-hidden rounded-xl text-white relative cursor-pointer">
                    <img className="object-cover h-full w-full" src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713114591/Bookit/assets/Tel-Aviv-Israel-skyline-sityscape-destinations-1200x900_cflelw.jpg" alt="telaviv" />
                    <div className="left-5 bottom-5 absolute">
                        <h1>Telaviv</h1>
                        <h2>{data[1]} properties</h2>
                    </div>
                </div>
                <div onClick={() => handleSearch("eilat")} className="h-64 flex-1 overflow-hidden rounded-xl text-white relative cursor-pointer">
                    <img className="object-cover h-full w-full" src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713114589/Bookit/assets/Eilat-Israel_fyjuv8.jpg" alt="eilat" />
                    <div className="left-5 bottom-5 absolute">
                        <h1>Eilat</h1>
                        <h2>{data[2]} properties</h2>
                    </div>
                </div>
            </>}
        </div>
    );
}