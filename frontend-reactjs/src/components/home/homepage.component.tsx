// Hooks and Types React
import { ChangeEvent, useEffect, useState } from "react";
// React Router DOM
import { useNavigate, useParams } from "react-router-dom";
import FooterPage from "./footer.component";
export const HomePage = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <html>
            <div className="home-page">
                <h1 className="text-center">VMO Holdings</h1>

                <h1>Welcome to my app!</h1>

                <p>You have clicked the button {count} times.</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
                <br />
            </div>
            <FooterPage/>
        </html>
    )
}
