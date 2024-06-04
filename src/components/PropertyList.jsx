import useFetch from "../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PropertyList()
{
    const navigate = useNavigate();
    const {data, loading} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/hotels/types/countByType`);
    const clickHandler = async (type) =>
    {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hotels/find/propertiesByType?type=${type}`);
        navigate("/hotels", { state: { propertiesData: res.data } });
    };
    
    return (
        <div className="pList gap-5 justify-between flex max-w-5xl w-full">
            {loading ? "loading" :<>
                {data && <>
                    <div onClick={() => clickHandler(data[0]?.type)} className="pListItem flex-1 cursor-pointer overflow-hidden rounded-xl">
                        <img src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713116801/Bookit/assets/hotel_c67ywk.jpg" alt="hotels" className="rounded-xl object-cover h-36 w-full" />
                        <div className="pListTitles">
                            <h1 className="text-lg text-center capitalize text-gray-400">{data[0]?.type}</h1>
                            <h4 className="text-center capitalize text-gray-400">{data[0]?.count}</h4>
                        </div>
                    </div>
                    <div className="pListItem flex-1 cursor-pointer overflow-hidden rounded-xl">
                        <img src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713116798/Bookit/assets/apartment_bet0rm.jpg" alt="apartments" className="rounded-xl object-cover h-36 w-full" />
                        <div className="pListTitles">
                            <h1 className="text-lg text-center capitalize text-gray-400">{data[1]?.type}</h1>
                            <h4 className="text-center capitalize text-gray-400">{data[1]?.count}</h4>
                        </div>
                    </div>
                    <div className="pListItem flex-1 cursor-pointer overflow-hidden rounded-xl">
                        <img src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713116803/Bookit/assets/resort_abj1rl.jpg" alt="resorts" className="rounded-xl object-cover h-36 w-full" />
                        <div className="pListTitles">
                            <h1 className="text-lg text-center capitalize text-gray-400">{data[2]?.type}</h1>
                            <h4 className="text-center capitalize text-gray-400">{data[2]?.count}</h4>
                        </div>
                    </div>
                    <div className="pListItem flex-1 cursor-pointer overflow-hidden rounded-xl">
                        <img src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713116805/Bookit/assets/villa_gfu8xr.jpg" alt="villas" className="rounded-xl object-cover h-36 w-full" />
                        <div className="pListTitles">
                            <h1 className="text-lg text-center capitalize text-gray-400">{data[3]?.type}</h1>
                            <h4 className="text-center capitalize text-gray-400">{data[3]?.count}</h4>
                        </div>
                    </div>
                    <div className="pListItem flex-1 cursor-pointer overflow-hidden rounded-xl">
                        <img src="https://res.cloudinary.com/dvhclgitc/image/upload/v1713116799/Bookit/assets/cabin_xole67.jpg" alt="cabins" className="rounded-xl object-cover h-36 w-full" />
                        <div className="pListTitles">
                            <h1 className="text-lg text-center capitalize text-gray-400">{data[4]?.type}</h1>
                            <h4 className="text-center capitalize text-gray-400">{data[4]?.count}</h4>
                        </div>
                    </div>
                </>}
            </>}
        </div>
    );
};