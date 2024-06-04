import { DateRange } from "react-date-range";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContex";
import { AuthContext } from "../context/AuthContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Header(props)
{
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const {dispatch} = useContext(SearchContext);
    const {user} = useContext(AuthContext);
    const [options, setOptions] = useState(
        {
            adult: 1,
            children: 0,
            room: 1
        }
    );

    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        }
    ]);

    const handleOption = (name, operation) =>
    {
        setOptions((prev) => 
        {
            return {...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1}
        });
    };

    const handleSearch = () =>
    {
        dispatch({type: "New_SEARCH", payload: {destination, dates, options}})
        navigate("/hotels", {state: {destination, dates, options}});
    };

    return (
        <div className="relative justify-center flex bg-sky-900 text-white">
            <div className={`${props.type === "list" ? "mt-5" : "mb-24 mt-5"}  mx-0 w-full max-w-5xl`}>
                <div className="mb-12 gap-10 flex">
                    <div className="gap-2.5 flex items-center">
                        <span><NavLink className={"act"} to={"/"}>Home</NavLink></span>
                    </div>
                    <div className="gap-2.5 p-2.5 flex items-center">
                        <span><NavLink className={"act"} to={"/about"}>About</NavLink></span>
                    </div>
                </div>
                {props.type !== "list" && <>
                    <h1 className="headerTitle text-5xl">
                        A lifetime of discounts? It's Genius
                    </h1>
                    <p className="headerDesc mx-0 my-5">
                        Get rewarded for your travels - unlock instant savings of 10%
                        or more with a free Bookit account.
                    </p>
                    <div className="headerSearch w-full max-w-5xl -bottom-6 absolute rounded-md py-2.5 px-0 justify-around items-center flex bg-white h-12">
                        <div className="headerSearchItem gap-2.5 flex items-center">
                            <svg className="headerIcon" xmlns="http://www.w3.org/2000/svg" fill="lightgray" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="M40-200v-600h80v400h320v-320h320q66 0 113 47t47 113v360h-80v-120H120v120H40Zm240-240q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm240 40h320v-160q0-33-23.5-56.5T760-640H520v240ZM280-520q17 0 28.5-11.5T320-560q0-17-11.5-28.5T280-600q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-40Zm240-80v240-240Z" />
                            </svg>
                            <input onChange={(event) => setDestination(event.target.value)} type="text" placeholder="where are your going?" className="headerSearchInput border-none outline-none text-black" />
                        </div>
                        <div className="headerSearchItem cursor-pointer gap-2.5 flex items-center">
                            <svg className="headerIcon" xmlns="http://www.w3.org/2000/svg" fill="lightgray" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
                            </svg>
                            <span className="headerSearchText text-gray-500" onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "mm/dd/yyyy")} to ${format(dates[0].endDate, "mm/dd/yyyy")}`}</span>
                            {openDate && <DateRange minDate={new Date()} className="date z-20 absolute top-12" editableDateInputs={true} onChange={(item) => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates}></DateRange>}
                        </div>
                        <div className="headerSearchItem cursor-pointer gap-2.5 items-center flex">
                            <svg className="headerIcon" xmlns="http://www.w3.org/2000/svg" fill="lightgray" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
                            </svg>
                            <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText text-gray-500">{`${options.adult} adult | ${options.children} children | ${options.room} room`}</span>
                            {openOptions && <div className="options z-20 shadow-3xl rounded-5 text-gray-500 bg-white absolute top-12">
                                <div className="optionItem m-2.5 justify-between flex w-48">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter text-black text-xs gap-2.5 items-center flex">
                                        <button disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")} className="optionCounterButton bg-white cursor-pointer text-sky-800 rounded-sm border-sky-800 border-solid border w-7 h-7">-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button onClick={() => handleOption("adult", "i")} className="optionCounterButton bg-white cursor-pointer text-sky-800 rounded-sm border-sky-800 border-solid border w-7 h-7">+</button>
                                    </div>
                                </div>
                                <div className="optionItem m-2.5 justify-between flex w-48">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter text-black text-xs gap-2.5 items-center flex">
                                        <button disabled={options.children <= 0} onClick={() => handleOption("children", "d")} className="optionCounterButton bg-white cursor-pointer text-sky-800 rounded-sm border-sky-800 border-solid border w-7 h-7">-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button onClick={() => handleOption("children", "i")} className="optionCounterButton bg-white cursor-pointer text-sky-800 rounded-sm border-sky-800 border-solid border w-7 h-7">+</button>
                                    </div>
                                </div>
                                <div className="optionItem m-2.5 justify-between flex w-48">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter text-black text-xs gap-2.5 items-center flex">
                                        <button disabled={options.room <= 1} onClick={() => handleOption("room", "d")} className="optionCounterButton bg-white cursor-pointer text-sky-800 rounded-sm border-sky-800 border-solid border w-7 h-7">-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button onClick={() => handleOption("room", "i")} className="optionCounterButton bg-white cursor-pointer text-sky-800 rounded-sm border-sky-800 border-solid border w-7 h-7">+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem gap-2.5 items-center flex">
                            <button onClick={handleSearch} className="rounded-md cursor-pointer p-2.5 font-medium text-white bg-blue-700">Search</button>
                        </div>
                    </div>
                </>}
            </div>
        </div>
    );
}