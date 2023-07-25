// Hooks and Types React
import { ChangeEvent, useEffect, useState } from "react";
// React Router DOM
import { useNavigate, useParams } from "react-router-dom";
import FooterPage from "./footer.component";
export const HomePage = () => {

    return (
        <html>
            <div className="home-page">
                <h1 className="text-center">VMO Holdings</h1>
                <br />
            </div>
            <FooterPage/>
        </html>
    )
}
