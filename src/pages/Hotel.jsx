import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import useFetch from "../hooks/useFetch";
import Reserve from "../components/Reserve";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContex";
import { AuthContext } from "../context/AuthContext";

export default function Hotel()
{
    const {dates, options} = useContext(SearchContext);
    const {id} = useParams();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    // const days = dayDifference(dates[0].endDate, dates[0].startDate);
    const navigate = useNavigate();
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const {data, loading, error} = useFetch(`${import.meta.env.VITE_BACKEND_URL}/hotels/${id}`);
    const {user} = useContext(AuthContext);
    const handleOpen = (index) =>
    {
        setSlideNumber(index);
        setOpen(true);
    };

    const handleMove = (direction) =>
    {
        let newSlideNumber;
        if (direction === "left")
        {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        }
        else
        {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    // const dayDifference = (date1, date2) =>
    // {
    //     const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    //     const diffDays = Math.ceil(timeDiff / millisecondsPerDay);

    //     return diffDays;
    // };

    const handleClick = () =>
    {
        if (user)
        {
            setOpenModal(true);
        }
        else
        {
            navigate("/login");
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <Header type="list"></Header>
            {loading ? "loading" : <div className="hotelContainer items-center flex-col mt-5 justify-center flex">
                {open && <div className="slider flex items-center z-40 bg-black/40 h-screen w-screen left-0 top-0 sticky">
                    <svg onClick={() => setOpen(false)} className="close cursor-pointer text-3xl right-5 top-5 absolute" fill="lightgray" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                    <svg onClick={() => handleMove("left")} className="arrow cursor-pointer text-5xl m-5" fill="lightgray" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                    </svg>
                    <div className="sliderWrapper items-center justify-center flex h-full w-full">
                        <img src={data?.photos[slideNumber]} alt="" className="sliderImg h-8vh w-4/5" />
                    </div>
                    <svg onClick={() => handleMove("right")} className="arrow cursor-pointer text-5xl m-5" fill="lightgray" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                    </svg>
                </div>}
                <div className="hotelWrapper relative gap-2.5 flex-col flex max-w-97 w-full">
                    <button onClick={handleClick} className="bookNow cursor-pointer rounded-5 font-bold text-white bg-blue-700 px-5 py-2.5 border-none right-0 top-2.5 absolute">Reserve or Book Now!</button>
                    <h1 className="hotelTitle text-2xl">{data.name}</h1>
                    <div className="hotelAddress gap-2.5 items-center flex text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                        </svg>
                        <span>{data.address}</span>
                    </div>
                    <span className="hotelDistance font-medium text-blue-700">Excellent location - {data.distance}m from center</span>
                    <span className="hotelPriceHighlight font-medium text-green-400">Book a stay over ${data.price} at this property and get a free airport taxi</span>
                    <div className="hotelImages justify-between flex-wrap flex">
                        {data && data.photos && data?.photos.map((photo, i) =>
                            {
                                return (<div key={i} className="hotelImageWrapper w-4/12">
                                    <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg object-cover w-full" />
                                </div>)
                            })
                        }
                    </div>
                    <div className="hotelDetails mt-5 gap-5 justify-between flex">
                        <div className="hotelDetailsTesxts flex-3">
                            <h1 className="hotelTitle">{data.title}</h1>
                            <p className="hotelDesc mt-5 text-sm">{data.description}</p>
                        </div>
                        <div className="hotelDetailsPrice gap-5 flex-col flex p-5 bg-slate-100 flex-1">
                            <h1 className="text-lg text-gray-600">Perfect for a "days"-night stay!</h1>
                            <span className="text-sm">
                                located in the real heart of krakow, this property has an 
                                excellent location score of 9.8!
                            </span>
                            <h2 className="font-light">
                                {/* <b>${days * data.cheapestPrice * options.room}</b> ("days" nights) */}
                            </h2>
                            <button onClick={handleClick} className="py-2.5 rounded-5 cursor-pointer font-bold text-white bg-blue-700 px-5 border-none">Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList></MailList>
            </div>}
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id} rooms={data.rooms}></Reserve>}
        </div>
    );
}