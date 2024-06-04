import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function About()
{
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className="w-full flex justify-center">
                <div className="gap-7 items-center justify-center flex-col flex mt-16 w-[60%]">
                    <p>
                        BookIt is a full-stack project meticulously crafted to reimagine the booking experience for travelers
                        worldwide. Developed with a passion for innovation and a commitment to excellence, BookIt seamlessly 
                        integrates front-end elegance with back-end functionality to deliver a user-friendly platform that 
                        simplifies the entire booking process. From its inception, BookIt has been driven by a dedication to 
                        providing travelers with a comprehensive solution for their accommodation needs, backed by robust 
                        technology and a relentless pursuit of customer satisfaction. As a project, BookIt embodies the spirit of 
                        creativity, collaboration, and continuous improvement, aiming to set new standards in the world of online booking.
                    </p>
                    <p>
                        Welcome to BookIt!
                        <br />
                        <br />
                        At BookIt, we're passionate about simplifying the way you travel. Our platform was born out of the 
                        desire to create a seamless booking experience for travelers worldwide. Whether you're planning a 
                        spontaneous weekend getaway or meticulously organizing every detail of your next adventure, BookIt 
                        is here to make your journey effortless and enjoyable.
                    </p>
                </div>
            </div>
        </div>
    );
}