export default function MailList()
{
    return (
        <div className="mail p-12 gap-5 items-center flex-col flex w-full mt-12 bg-blue-700 text-white">
            <h1 className="mailTitle">Save time, save money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you</span>
            <div className="mailInputContainer">
                <input className="border-none rounded-5 mr-2.5 p-2.5 h-8 w-72" type="text" placeholder="Your Email" />
                <button className="h-8 px-2.5 cursor-pointer rounded-5 border-none font-medium text-white bg-blue-400">Subscribe</button>
            </div>
            <div className="w-full max-w-5xl text-xs text-left">Copyright © 2024 Bookit</div>
        </div>
    );
}