import React from "react";
import { useLocation, useNavigate } from "react-router";

function Home() {
    const location = useLocation();

    return (
        <div className="homepage"> 
            <h1 >Welcome {location.state.id}</h1>
        </div>
    );
}
export default Home;