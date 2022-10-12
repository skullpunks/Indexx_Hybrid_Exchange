import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import IndexxSwap from "./components/IndexxSwap/IndexxSwap";
import BuySell from "./components/BuySell/BuySell";
import Help from './components/Help/Help';
import Intro from './components/Help/Intro';
import Team from './components/Help/Team';
import ContactUs from './components/Help/ContactUs';
import TradeToEarn from './components/TradeToEarn/TradeToEarn';
import BuySellLogin from './components/BuySell/BuySellLogin';
// import BuySellLoggedVerfication from './components/BuySell/BuySellLoggedVerfication';
import BuySellLoggedWelcome from './components/BuySell/BuySellLoggedWelcome';
import TradeChart from './components/TradeChart/TradeChart';
import Markets from './components/Markets/Markets';
import IndexBlog from './components/IndexBlog/IndexBlog';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/*" element={<Home />} />
                    <Route path="/indexx-exchange/swap" element={<IndexxSwap />} />
                    <Route path="/indexx-exchange/buy-sell" element={<BuySell />} />
                    <Route path="/indexx-exchange/buy-sell/login" element={<BuySellLogin />} />
                    <Route path="/indexx-exchange/buy-sell/welcome" element={<BuySellLoggedWelcome />} />
                    <Route path="/indexx-exchange/trade-to-earn" element={<TradeToEarn />} />
                    <Route path="/indexx-exchange/charts" element={<Home />} />
                    <Route path="/indexx-exchange/markets" element={<Markets />} />
                    <Route path="/indexx-exchange/trade" element={<TradeChart />} />
                    <Route path="/indexx-exchange/help" element={<Help />} >
                        <Route index element={<Intro />} />
                        <Route path="team" element={<Team />} />
                        <Route path="contact" element={<ContactUs />} />
                    </Route>
                    <Route path="/indexx-exchange/blog" element={<IndexBlog />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
