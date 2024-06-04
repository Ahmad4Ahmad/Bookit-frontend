import { Link } from "react-router-dom";

export default function SearchItem(props)
{
    return (
        <div className="searchItem mb-5 gap-5 justify-between flex rounded-5 p-2.5 border-solid border-2 border-gray-300">
            <img src={props.item.photos[0]} alt="" className="siImg object-cover h-48 w-48" />
            <div className="siDesc flex-2 gap-2.5 flex-col flex">
                <h1 className="siTitle text-blue-400 text-xl">{props.item.name}</h1>
                <span className="siDistance text-white bg-green-400 text-xs">{props.item.distance}</span>
                <span className="siTaxiOp rounded-5 p-1 w-max text-xs">Free airport taxi</span>
                <span className="siSubtitle font-bold text-xs">Studio Apartment with air conditioning</span>
                <span className="siFeatures text-xs">{props.item.desc}</span>
                <span className="siCancelOption font-bold text-green-500 text-xs">Free cancellation</span>
                <span className="siCancelOpSubtitle text-green-500 text-xs">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="siDetails justify-between flex-col flex flex-1">
                {props.item.rating && <div className="siRating justify-between flex">
                    <span className="font-medium">Excellent</span>
                    <button className="bg-blue-700 border-none font-bold p-2 text-white">{props.item.rating}</button>
                </div>}
                <div className="siDetailTexts gap-1 flex-col flex text-right">
                    <span className="siPrice text-2xl">${props.item.price}</span>
                    <span className="siTaxOp text-gray-500 text-xs">Includes taxes and fees</span>
                    <Link to={`/hotels/${props.item._id}`}>
                        <button className="siCheckButton rounded-5 cursor-pointer border-none px-1 py-2.5 font-bold text-white bg-blue-700">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}