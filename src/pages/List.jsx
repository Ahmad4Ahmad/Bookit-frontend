import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

export default function List()
{
    const location = useLocation();
    const [destination, setDestination] = useState(location.state.destination || "");
    const [dates, setDates] = useState([{startDate: new Date(), endDate: new Date(), key: "selection"}]);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState({adult: 1, children: 0, room: 1});
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);
    const {data, loading, reFetch} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`);
    console.log(data);
    const handleSearch = () =>
    {
        reFetch();
    };

    return (
        <div>
            <Navbar></Navbar>
            <Header type="list"></Header>
            <div className="listContainer mt-5 justify-center flex">
                <div className="listWrapper gap-5 flex max-w-97 w-full">
                    <div className="listSearch h-max p-2.5 top-2.5 rounded-lg sticky bg-yellow-300 flex-1">
                        <h1 className="lsTitle mb-2.5 text-gray-500 text-xl">Search</h1>
                        <div className="lsItem mb-2.5 gap-1 flex-col flex">
                            <label className="text-xs" htmlFor="">Destination</label>
                            <input className="p-1 h-8 border-none" onChange={(event) => setDestination(event.target.value)} value={destination} type="text" />
                        </div>
                        <div className="mb-2.5 gap-1 flex-col flex">
                            <label htmlFor="">Check-in Date</label>
                            <span onClick={() => setOpenDate(!openDate)} className="cursor-pointer items-center flex h-8 p-1 bg-white">{`${dates[0].startDate.toLocaleDateString('en-GB')} to ${dates[0].endDate.toLocaleDateString('en-GB')}`}</span>
                            {openDate && <DateRange ranges={dates} onChange={item => setDates([item.selection])} minDate={new Date()}></DateRange>}
                        </div>
                        <div className="mb-2.5 gap-1 flex-col flex">
                            <label htmlFor="">Options</label>
                            <div className="lsOptions p-2.5">
                                <div className="lsOptionItem text-xs text-gray-500 mb-2.5 justify-between flex">
                                    <span className="lsOpyionText">Min price <small>per night</small></span>
                                    <input onChange={(event) => setMin(event.target.value)} type="number" className="lsOptionInput w-12" />
                                </div>
                                <div className="text-xs text-gray-500 mb-2.5 justify-between flex">
                                    <span className="lsOpyionText">Max price <small>per night</small></span>
                                    <input onChange={(event) => setMax(event.target.value)} type="number" className="w-12" />
                                </div>
                                <div className="text-xs text-gray-500 mb-2.5 justify-between flex">
                                    <span className="lsOpyionText">Adult</span>
                                    <input min={1} placeholder={options.adult} type="number" className="lsOptionInput" />
                                </div>
                                <div className="text-xs text-gray-500 mb-2.5 justify-between flex">
                                    <span className="lsOpyionText">Children</span>
                                    <input min={0} placeholder={options.children} type="number" className="lsOptionInput" />
                                </div>
                                <div className="text-xs text-gray-500 mb-2.5 justify-between flex">
                                    <span className="lsOpyionText">Room</span>
                                    <input min={1} placeholder={options.room} type="number" className="lsOptionInput" />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSearch} className="text-white rounded cursor-pointer font-medium w-full border-none p-2.5 bg-blue-700">Search</button>
                    </div>
                    <div className="listResult flex-3">
                        {loading ? "loading" : <>
                            {data.map((item) => 
                            {
                                return (<SearchItem item={item} key={item._id}></SearchItem>)
                            })}
                        </>}
                        {location.state.propertiesData.map((item) => 
                        {
                            return (<SearchItem item={item} key={item._id}></SearchItem>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}