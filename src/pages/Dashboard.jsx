import Sidebar from "../components/Sidebar";

export default function Dashboard(props)
{
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-7">
                {props.children}
            </div>
        </div>
    );
}