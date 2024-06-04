import Home from "./pages/Home";
import List from "./pages/List";
import Hotel from "./pages/Hotel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import EditProperty from "./pages/EditProperty";
import NewProperty from "./pages/NewProperty";
import Properties from "./pages/Properties";
import Bookings from "./pages/Bookings";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() 
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/hotels" element={<List></List>}></Route>
                <Route path="/hotels/:id" element={<Hotel></Hotel>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/profile" element={<Dashboard><Profile></Profile></Dashboard>}></Route>
                <Route path="/bookings" element={<Dashboard><Bookings></Bookings></Dashboard>}></Route>
                <Route path="/properties" element={<Dashboard><Properties></Properties></Dashboard>}></Route>
                <Route path="/new" element={<Dashboard><NewProperty></NewProperty></Dashboard>}></Route>
                <Route path="/edit" element={<Dashboard><EditProfile></EditProfile></Dashboard>}></Route>
                <Route path="/edit-property/:id" element={<Dashboard><EditProperty></EditProperty></Dashboard>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App