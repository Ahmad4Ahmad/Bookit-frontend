import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Featured from "../components/Featured";
import PropertyList from "../components/PropertyList";
import FeaturedProperties from "../components/FeaturedProperties";
import MailList from "../components/MailList";

export default function Home()
{
    return(
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className="gap-7 items-center flex-col flex mt-12">
                <Featured></Featured>
                <h1 className="homeTitle text-xl w-97">Browse by property type</h1>
                <PropertyList></PropertyList>
                <h1 className="homeTitle text-xl w-97">Home guests love</h1>
                <FeaturedProperties></FeaturedProperties>
                <MailList></MailList>
            </div>
        </div>
    );
}