import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import IndexxScan from "./components/IndexxScan/IndexxScan";
import BuySell from "./components/BuySell/BuySell";
import SelectToken from './components/SelectToken/SelectToken';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/indexx-exchange/swap" element={<IndexxScan />} />
                    <Route path="/indexx-exchange/SelectToken" element={<SelectToken />} />
                    <Route path="/indexx-exchange/buy_sell" element={<BuySell />} />
                    <Route path="/indexx-exchange/indexxscan" element={<IndexxScan />} />
                    <Route path="/indexx-exchange/charts" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
