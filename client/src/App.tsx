import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import "./App.scss"

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <AppRouter/>
            </div>
        </BrowserRouter>
    );
};

export default App;