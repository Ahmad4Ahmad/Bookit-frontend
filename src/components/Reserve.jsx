import axios from "axios";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContex";
import { useState, useContext } from "react";

export default function Reserve(props)
{
    const navigate = useNavigate();
    const [selectedRooms, setSelectedRooms] = useState([])
    // const {data, loading, error} = useFetch(`hotels/room/${hotelId}`);
    // const {dates} = useContext(SearchContext);
    // const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    const handleSelect = (event) =>
    {
        const checked = event.target.checked;
        const value = event.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
    };

    // const getDatesInRange = (startDate, endDate) =>
    // {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //     const date = new Date(start.getTime());
    //     let dates = [];
    //     while(data <= end)
    //     {
    //         dates.push(new Date(date));
    //         date.setDate(date.getDate()+1);
    //     }

    //     return dates
    // };

    // const isAvailable = (roomNumber) =>
    // {
    //     const isFound = roomNumber.unavailableDates.some((date) =>
    //     {
    //         allDates.includes(new Date(date).getTime());
    //     });

    //     return !isFound;
    // };

    const handleClick = async () =>
    {
        try
        {
            await Promise.all(selectedRooms.map((roomId) =>
            {
                const res = axios.put(`/rooms/availability/${roomId}`, {dates: allDates});
                return res.data;
            }));

            props.setOpen(false);
            navigate("/");
        }
        catch (error)
        {
            console.error(error);
        }
    };

    return (
        <div className="reserve justify-center flex items-center left-0 top-0 fixed bg-black bg-opacity-40 h-screen w-screen">
            <div className="rContainer relative p-5 bg-white">
                <svg className="rClose top-0 right-0 cursor-pointer absolute" onClick={() => props.setOpen(false)} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
                <span>Select Your rooms:</span>
                {/* {data.map((item) => 
                {
                    <div className="rItem p-5 gap-12 flex items-center">
                        <div className="rItemInfo gap-1 flex flex-col">
                            <div className="rTitle font-medium">{item.title}</div>
                            <div className="rDesc font-light">{item.Desc}</div>
                            <div className="rMax text-xs">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice font-medium">{item.price}</div>
                        </div>
                        <div className="rSelectRooms text-gray-500 text-xs flex flex-wrap gap-1">
                            {item.roomNumbers.map((roomNumber) =>
                            {
                                <div className="room flex-col flex">
                                    <label>{roomNumber.number}</label>
                                    <input disabled={!isAvailable(roomNumber)} type="checkbox" value={roomNumber._id} onChange={handleSelect} />
                                </div>
                            })}
                        </div>
                    </div>
                })} */}
                <div className="rItem p-5 gap-12 flex items-center">
                    <div className=" text-gray-500 text-xs flex flex-col flex-wrap gap-1">
                        {props.rooms.map((room, index) =>
                        {
                            return (
                                <div key={index} className="flex">
                                    <input type="checkbox" value={room} onChange={handleSelect} />
                                    <label className="ml-2">{room}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button className="rButton px-5 bg-blue-700 text-white font-bold cursor-pointer rounded-5 w-full mt-5 py-2.5 border-none" onClick={handleClick}>Reserve Now!</button>
            </div>
        </div>
    );
};