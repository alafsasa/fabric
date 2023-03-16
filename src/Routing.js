import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LueminourPage from "./LueminourPage";

//routing function
export default function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/lueminour" element={<LueminourPage/>} />
            </Routes>
        </BrowserRouter>
    );
}