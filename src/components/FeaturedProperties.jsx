import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function FeaturedProperties()
{
    const { data, loading} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/hotels?featured=true&limit=4`);
    
    return (
        <div className="justify-between gap-5 flex max-w-97 w-full">
            {loading ? "loading" : <>
                {data.map((item) => 
                { return (   
                    <div key={item._id} className="fpItem flex flex-col flex-1 gap-2.5">
                        <Link to={`/hotels/${item._id}`}><img src={item.photos[0]} alt="property" className="rounded-xl cursor-pointer h-40 w-full" /></Link>
                        <span className="fpName font-bold">{item.name}</span>
                        <span className="fpCite font-light">{item.city}</span>
                        <span className="fpPrice font-medium">Starting from ${item.price}</span>
                        {item.rating && <div className="fpRating">
                            <button className="bg-blue-700 text-white border-none p-1 mr-2.5 font-bold">{item.rating}</button>
                            <span className="text-sm">Excellent</span>
                        </div>}
                    </div>
                )})}
            </>}
        </div>
    );
}