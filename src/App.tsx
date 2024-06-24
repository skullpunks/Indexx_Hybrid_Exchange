import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
// import Header from "./components/Header/Header";
import Home from './components/Home/Home';
import IndexxSwap from './components/IndexxSwap/IndexxSwap';
import BuySell from './components/BuySell/BuySell';
import Help from './components/Help/Help';
import Intro from './components/Help/Intro';
import Team from './components/Help/Team';
import ContactUs from './components/Help/ContactUs';
import TradeToEarn from './components/TradeToEarn/TradeToEarn';
import BuySellLogin from './components/BuySell/BuySellLogin';
import BSWallet from './components/BuySell/BSWallet';
// import BuySellLoggedVerfication from './components/BuySell/BuySellLoggedVerfication';
import BuySellLoggedWelcome from './components/BuySell/BuySellLoggedWelcome';
import TradeChart from './components/TradeChart/TradeChart';
import BugReport from './components/TaskCenter/BugReport';
import Markets from './components/Markets/Markets';
import IndexBlog from './components/IndexBlog/IndexBlog';
import HowItWorks from './components/HowItWorks/HowItWorks';
import HowCentralized from './components/HowItWorks/howCentralized';
import HowTokens from './components/HowItWorks/howTokens';
import HowTradeToEarn from './components/HowItWorks/howTradeToEarn';
import TaskCenter from './components/TaskCenter/TaskCenter';
import BSWithdrawMain from './components/BSDepositWithdraw/BSWithdrawMain';
import BSDepositWithdarwSelect from './components/BSDepositWithdraw/BSDepositWithdarwSelect';
import BSWithdrawInfo from './components/BSDepositWithdraw/BSWithdrawInfo';
import BSDWAmount from './components/BSDepositWithdraw/BSDWAmount';
import BSDWRecorded from './components/BSDepositWithdraw/BSDWRecorded';
import BuySellGetStartedLayout from './components/BuySell/BuySellGetStartedLayout';
import BSDepositCryproLayout from './components/BSDeposit/BSDepositCryproLayout';
import BSTransactionHistoryLayout from './components/BSTransactionHistory/BSTransactionHistoryLayout';
import BSDepositFiatLayout from './components/BSDeposit/BSDepositFiatLayout';
import BSWithdrawCryptoLayout from './components/BSDepositWithdraw/BSWithdrawCryptoLayout';
import IndexxTokens from './components/IndexxTokens/IndexxTokens';
import ComingSoon from './components/ComingSoon/ComingSoon';
import HeaderNew from './components/Header/HeaderNew';
import About from './components/About/About';
import Account from './components/AccountSettings/Account';
// import BSDashhboard from './components/BuySell/BSDashboard';
import SecurityChange from './components/AccountSettings/SecurityChange';
// import Blockpass from './components/Blockpass/Blockpass';
import BlockpassLink from './components/Blockpass/BlockpassLink';
// import { useEffect, useState } from 'react';
// import { decodeJWT, getUserDetails } from '../src/services/api';

// import Header from './components/Header/Header';
// import BuySellGetStarted from './components/BuySell/BuySellGetStarted';
// import BuySellEmailAuth from './components/BuySell/BuySellEmailAuth';
// import BuySellSecureSteps from './components/BuySell/BuySellSecureSteps';
// import BuySellMobiAuth from './components/BuySell/BuySellMobiAuth';
// import BuySellmobiVerfication from './components/BuySell/BuySellmobiVerfication';
import ScrollToTop from './utils/ScrollToTop';

import Notification from './components/Notifications/Notification';
import AllNotification from './components/Notifications/AllNotification';
import Activity from './components/Notifications/Activity';
import SystemMsg from './components/Notifications/SystemMsg';
import Career from './components/Careers/Career';
import WelcomePage from './components/WelcomePage';
import ImportTokens from './components/ImportTokens/ImportTokens';
import BSOrderHistoryLayout from './components/BSOrderHistory/BSOrderHistoryLayout';
import BuySellLoginContentHive from './components/BuySell/BuySellLoginContentHive';
import RedeemStock from './components/RedeemStock/RedeemStock';
import CaptainDash from './components/Dashboard/Captainbee/CaptainDash';
import CaptainProfile from './components/Dashboard/Captainbee/CaptainProfile';
import MyBees from './components/Dashboard/Captainbee/MyBees/MyBees';
import BeeDash from './components/Dashboard/Captainbee/MyBees/BeeDash';
import CaptainResource from './components/Dashboard/Captainbee/CaptainResource/CaptainResource';
import CaptainResourceManagement from './components/Dashboard/Captainbee/CaptainResource/CaptainResourceManagement';
import CaptainResourceTechnical from './components/Dashboard/Captainbee/CaptainResource/CaptainResourceTechnical';
import CaptainResourceLegal from './components/Dashboard/Captainbee/CaptainResource/CaptainResourceLegal';
import CaptainResourceAccounting from './components/Dashboard/Captainbee/CaptainResource/CaptainResourceAccounting';
import HoneyCombComingSoon from './components/ComingSoon/HoneyCombComingSoon';
import BeeProfile from './components/Dashboard/Honeybee/BeeProfile';
import MyCaptain from './components/Dashboard/Honeybee/MyCaptain/MyCaptain';
import HoneyCombComingSoonBees from './components/ComingSoon/HoneyCombComingSoonBees';
import BeeDash2 from './components/Dashboard/Honeybee/MyBees/BeeDash2';
import BuySellGetStartedLayoutHoneyBee from './components/BuySell/BuySellGetStartedLayoutHoneyBee';
import BuySellLoginHoneyBee from './components/BuySell/BuySellLoginHoneyBee';
import PowerPack from './components/PowerPack/PowerPack';
import PowerPackCopy from './components/PowerPack - Copy/PowerPack';
import AffiliateProgram from './components/AffiliateProgram';
import PaymentSuccess from './components/PowerPack/PaymentSuccess';
import HoneyComb from './components/Dashboard/Captainbee/HoneyComb';
import TeamCaptainDash from './components/Dashboard/Captainbee/TeamCaptainBees/TeamCaptainDash';
import LeaderCaptain from './components/Dashboard/Captainbee/LeaderCaptain/LeaderCaptain';

import LottoHome from './components/Lottery/LottoHome';
import { useTheme } from '@mui/material/styles';

// import CareerSoon from './components/Careers/CareerSoon';
import { ThemeProvider } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useState, useEffect, useMemo } from 'react';
import Staking from './components/Staking/Staking';
import BSStakingHistoryLayout from './components/BSStakingHistory/BSStakingHistoryLayout';
import Bridge from './components/Bridge/Bridge';
import CaptainResourceSales from './components/Dashboard/Captainbee/CaptainResource/CaptainResourceSales';
import Footer from './components/Footer/Footer';
import ComingSoonETF from './components/ComingSoon/ComingSoonETF';
import PowerPackHeader from './components/PowerPack/PowerPackHeader/PowerPackHeader';
import SubscribeSuccess from './components/PowerPack/SubscribeSuccess';
import HorizontalLinearStepper2 from './components/Send/HorizontalLinearStepper2';
import BuySellVerifyEmail from './components/BuySell/BuySellVerifyEmail';
import EliteClub from './components/EliteClub/EliteClub';
import EliteLearnMore from './components/EliteClub/EliteLearnMore';
import SecondaryHeader from './SecondaryHeader';
import Payment from './components/Send/Payment';
import PaymentWire from './components/Send/PaymentWire';
import CaptainGreetCard from './components/Dashboard/Captainbee/CaptainGreetCard';
import PaymentVenmo from './components/Send/PaymentVenmo';
import HeaderTest from './components/Header_test';
import { ThemeContext } from './utils/themeContext';
import PowerPackInitial from './components/PowerPackInitial';
import PowerPackCaptainSecond from './components/PowerPackInitial/PowerPackCaptionSecond';
import PowerPackHoneySecond from './components/PowerPackInitial/PowerPackHoneySecond';
import HiveForgotPassword from './components/BuySell/HiveForgotPassword';
import ThemeContextUpdated from './utils/ThemeContextUpdated.jsx';
import ThemeToggler from './components/ThemeToggler/index.js';
import Login from './pages/auth/LoginEmail/index';
import LoginPassword from './pages/auth/LoginPassword';
import ResetPass from './pages/auth/ResetPassword';
import SignUpEmailPage from './pages/auth/Signup/EmailOrPhone';
import SignUpEmailVerificationPage from './pages/auth/Signup/EmailVerification';
import CreatePasswordPage from './pages/auth/Signup/CreatePassword';
import RefferalPage from './pages/auth/Signup/Refferal';
import SelectRolePage from './pages/auth/Signup/SelectRole';
import BuySellPage from './pages/BuySell';
import AssetsPage from './pages/Assets';
import StakingPage from './pages/Staking';
import DepositSelectCurrency from './pages/deposit/DepositSelectCurrency';
import DepositEnterAmount from './pages/deposit/DepositEnterAmount';
import DepositAddAccountInfo from './pages/deposit/AddAcountInfo';
import WithdrawAddAccountInfo from './pages/withdraw/WithdrawInfo';
import WithdrawEnterAmount from './pages/withdraw/WithdrawEnterAmount';
import WithdrawTransferMoney from './pages/withdraw/WithdrawTransferMoney';
import WithdrawSuccessPage from './pages/withdraw/WithdrawSuccess';
// import BuySellAllLogin from "./components/BuySell/BuySellAllLogin";

function App() {
  const theme = useTheme();
  const [userLogged, setUserLogged] = useState('normal'); // Set the user's type

  useEffect(() => {
    const user =
      localStorage.getItem('userlogged') !== undefined
        ? setUserLogged(String(localStorage.getItem('userlogged')))
        : setUserLogged('normal');
  }, []);

  useEffect(() => {
    const handleStorageChange = (event: any) => {
      // console.log(event);
      if (setUserLogged !== event.currentTarget.localStorage.userlogged)
        setUserLogged(event.currentTarget.localStorage.userlogged);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const PrivateRoutes = () => {
    const isAuthenticated =
      localStorage.getItem('access_token') !== undefined &&
      localStorage.getItem('access_token') !== null;
    const isAllowed =
      localStorage.getItem('userType') === 'CaptainBee' &&
      localStorage.getItem('haspp') === 'false';

    if (isAuthenticated && !isAllowed) {
      return <Outlet />;
    } else if (!isAuthenticated) {
      return <Navigate to="/update/home/" />;
    }

    if (isAllowed) {
      return <Navigate to="/indexx-exchange/power-pack" />;
    }
    return <Outlet />;
  };
  console.log(window.location.pathname, 'path');

  return (
    <ThemeContextUpdated>
      <div>
        {/* <ThemeToggler /> */}
        <BrowserRouter>
          {/* <Headers /> */}
          <ScrollToTop />
          {/* <HeaderNew /> */}
          <HeaderTest />

          {/* <SecondaryHeader /> */}
          <Routes>
            <Route path="/" element={<Navigate to="/update/home/" />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path="/indexx-exchange/send"
                element={<HorizontalLinearStepper2 />}
              />
              <Route path="/wallet/overview" element={<AssetsPage />} />
              <Route
                path="/indexx-exchange/buy-sell/staking"
                // element={<StakingPage />}
                element={<Staking />}
              />
              <Route
                path="/deposit-select-currency"
                element={<DepositSelectCurrency />}
              />
              <Route
                path="/deposit-enter-amount"
                element={<DepositEnterAmount />}
              />
              <Route
                path="/deposit-add-account-information"
                element={<DepositAddAccountInfo />}
              />
              <Route
                path="/withdraw-add-information"
                element={<WithdrawAddAccountInfo />}
              />
              <Route
                path="/withdraw-enter-amount"
                element={<WithdrawEnterAmount />}
              />
              <Route
                path="/withdraw-transfer-money"
                element={<WithdrawTransferMoney />}
              />
              <Route
                path="/withdraw-success"
                element={<WithdrawSuccessPage />}
              />

              <Route
                path="/indexx-exchange/power-hive"
                element={<PowerPackInitial />}
              />
              <Route
                path="/indexx-exchange/power-hive/honey-bee-selection"
                element={<PowerPackHoneySecond />}
              />
              <Route
                path="/indexx-exchange/power-hive/captain-bee-selection"
                element={<PowerPackCaptainSecond />}
              />
              <Route
                path="/indexx-exchange/dashboard"
                element={<CaptainDash />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-profile"
                element={<CaptainProfile />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-mybees"
                element={<MyBees />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-mybees/:id/:tab/:userType"
                element={<BeeDash />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-resource-mkt"
                element={<CaptainResource />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-resource-acc"
                element={<CaptainResourceAccounting />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-resource-leg"
                element={<CaptainResourceLegal />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-resource-tech"
                element={<CaptainResourceTechnical />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-resource-mgmt"
                element={<CaptainResourceManagement />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-resource-sales"
                element={<CaptainResourceSales />}
              />
              <Route
                path="/indexx-exchange/dashboard/honeycomb"
                element={<HoneyComb />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-mycaptains"
                element={<TeamCaptainDash />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-leader"
                element={<LeaderCaptain />}
              />
              <Route
                path="/indexx-exchange/dashboard/capt-greet"
                element={<CaptainGreetCard />}
              />

              {/* Routes for Honey Bee DashBoard   */}
              <Route
                path="/indexx-exchange/bee-dashboard"
                element={<BeeDash2 />}
              />
              <Route
                path="/indexx-exchange/bee-dashboard/bee-profile"
                element={<BeeProfile />}
              />
              <Route
                path="/indexx-exchange/bee-dashboard/bee-captain"
                element={<MyCaptain />}
              />
              <Route
                path="/indexx-exchange/bee-dashboard/honeycomb"
                element={<HoneyCombComingSoonBees />}
              />
            </Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/login-password" element={<LoginPassword />} />
            <Route path="/auth/reset-password" element={<ResetPass />} />
            <Route path="/auth/signup-email" element={<SignUpEmailPage />} />
            <Route
              path="/auth/signup-email-verification"
              element={<SignUpEmailVerificationPage />}
            />
            <Route
              path="/auth/signup-create-password"
              element={<CreatePasswordPage />}
            />
            <Route path="/auth/signup-referral" element={<RefferalPage />} />
            {/* <Route path="/auth/signup-role" element={<SelectRolePage />} /> */}

            <Route path="/update/home/*" element={<BuySellPage />} />
            <Route path="/update/home/etf-tokens" element={<BuySellPage />} />
            <Route path="/update/home/stock-token" element={<BuySellPage />} />

            <Route path="/indexx-exchange/lottery" element={<LottoHome />} />
            <Route path="/indexx-exchange/elite-club" element={<EliteClub />} />
            <Route
              path="/indexx-exchange/elite-learn/:id"
              element={<EliteLearnMore />}
            />

            <Route
              path="/indexx-exchange/payment-zelle"
              element={<Payment />}
            />
            <Route
              path="/indexx-exchange/payment-venmo"
              element={<PaymentVenmo />}
            />
            <Route
              path="/indexx-exchange/payment-wire"
              element={<PaymentWire />}
            />

            {/* <Route
                path="/indexx-exchange/power-pack"
                element={<PowerPack />}
              /> */}
            <Route
              path="/indexx-exchange/powerpack-payment-success"
              element={<PaymentSuccess />}
            />
            <Route
              path="/indexx-exchange/subscribe-success"
              element={<SubscribeSuccess />}
            />

            <Route path="/indexx-exchange/bridge" element={<Bridge />} />

            <Route path="/indexx-exchange/lottery" element={<LottoHome />} />
            <Route path="/indexx-exchange/elite-club" element={<EliteClub />} />
            <Route
              path="/indexx-exchange/elite-learn/:id"
              element={<EliteLearnMore />}
            />

            <Route
              path="/indexx-exchange/affiliate"
              element={<AffiliateProgram />}
            />

            <Route
              path="/indexx-exchange/power-pack"
              element={<PowerPack type="captainBee" />}
            />

            <Route
              path="/indexx-exchange/captain-bee/power-pack"
              element={<PowerPackCopy type="captainBee" subType="power" />}
            />
            <Route
              path="/indexx-exchange/captain-bee/crypto-pack"
              element={<PowerPackCopy type="captainBee" subType="crypto" />}
            />

            <Route
              path="/indexx-exchange/honey-bee/action-pack"
              element={<PowerPackCopy type="honeyBee" subType="action" />}
            />
            <Route
              path="/indexx-exchange/honey-bee/token-pack"
              element={<PowerPackCopy type="honeyBee" subType="token" />}
            />
            <Route
              path="/indexx-exchange/powerpack-payment-success"
              element={<PaymentSuccess />}
            />
            <Route
              path="/indexx-exchange/subscribe-success"
              element={<SubscribeSuccess />}
            />

            <Route
              path="/indexx-exchange/buy-sell/staking"
              element={<StakingPage />}
            />
            <Route path="/indexx-exchange/bridge" element={<Bridge />} />

            <Route path="/indexx-exchange/kyc" element={<BlockpassLink />} />
            <Route path="/indexx-exchange/swap" element={<IndexxSwap />} />
            <Route
              path="/indexx-exchange/coming-soon-etf"
              element={<ComingSoonETF />}
            />
            <Route
              path="/indexx-exchange/coming-soon"
              element={<ComingSoon />}
            />
            <Route
              path="/indexx-exchange/import-indexx-tokens"
              element={<ImportTokens />}
            />
            <Route path="/indexx-exchange/tokens" element={<IndexxTokens />} />
            {/* <Route path="/indexx-exchange/buy-sell/*" element={<BuySell />} /> */}
            <Route
              path="/indexx-exchange/buy-sell/for-honeybee/:id/*"
              element={<BuySell />}
            />
            <Route
              path="/indexx-exchange/buy-sell/login/*"
              element={<Navigate to="/update/home/" />}
            />

            <Route
              path="/indexx-exchange/buy-sell/login-honeybee/*"
              element={<BuySellLoginHoneyBee />}
            />
            <Route
              path="/indexx-exchange/buy-sell/hive-login"
              element={<BuySellLoginContentHive />}
            />
            <Route
              path="/indexx-exchange/buy-sell/hive-login/forgot-password"
              element={<HiveForgotPassword />}
            />
            <Route
              path="/indexx-exchange/buy-sell/wallet"
              element={<AssetsPage />}
            />
            <Route
              path="/indexx-exchange/buy-sell/withdraw-crypto/*"
              element={<BSWithdrawCryptoLayout />}
            />
            <Route
              path="/indexx-exchange/buy-sell/withdraw"
              element={<BSWithdrawMain />}
            >
              <Route index element={<BSDepositWithdarwSelect />} />
              <Route path="info" element={<BSWithdrawInfo />} />
              <Route path="amount" element={<BSDWAmount />} />
              <Route path="recorded" element={<BSDWRecorded />} />
            </Route>
            <Route
              path="/indexx-exchange/buy-sell/deposit-crypto/*"
              element={<BSDepositCryproLayout />}
            />
            <Route
              path="/indexx-exchange/redeem-stock"
              element={<RedeemStock />}
            />
            <Route
              path="/indexx-exchange/buy-sell/deposit-fiat/*"
              element={<BSDepositFiatLayout />}
            />
            <Route
              path="/indexx-exchange/buy-sell/transaction-history/*"
              element={<BSTransactionHistoryLayout />}
            />
            <Route
              path="/indexx-exchange/buy-sell/staking-history/*"
              element={<BSStakingHistoryLayout />}
            />
            <Route
              path="/indexx-exchange/buy-sell/order-history/*"
              element={<BSOrderHistoryLayout />}
            />
            <Route
              path="/indexx-exchange/buy-sell/get-started/*"
              element={<BuySellGetStartedLayout />}
            />
            <Route
              path="/indexx-exchange/buy-sell/get-started-honeybee/*"
              element={<BuySellGetStartedLayoutHoneyBee />}
            />
            <Route
              path="/indexx-exchange/buy-sell/welcome"
              element={<BuySellLoggedWelcome />}
            />
            <Route
              path="/indexx-exchange/trade-to-earn"
              element={<TradeToEarn />}
            />
            <Route
              path="/indexx-exchange/reward-center"
              element={<TaskCenter />}
            />
            <Route path="/indexx-exchange/report-bug" element={<BugReport />} />
            <Route
              path="/indexx-exchange/how-it-works"
              element={<HowItWorks />}
            />
            <Route
              path="/indexx-exchange/how-it-works/centralized"
              element={<HowCentralized />}
            />
            <Route
              path="/indexx-exchange/how-it-works/tradetoearn"
              element={<HowTradeToEarn />}
            />
            <Route
              path="/indexx-exchange/how-it-works/tokens"
              element={<HowTokens />}
            />
            <Route path="/indexx-exchange/charts" element={<Home />} />
            <Route path="/indexx-exchange/charts" element={<Home />} />
            {localStorage.getItem('user') ? (
              <Route path="/indexx-exchange/markets" element={<Markets />} />
            ) : (
              <Route path="/indexx-exchange/markets" element={<Markets />} />
            )}
            <Route path="/indexx-exchange/trade" element={<TradeChart />} />
            <Route path="/indexx-exchange/about" element={<About />} />
            <Route path="/indexx-exchange/help" element={<Help />}>
              <Route index element={<Intro />} />
              <Route path="team" element={<Team />} />
              <Route path="contact" element={<ContactUs />} />
            </Route>
            <Route
              path="/indexx-exchange/notification"
              element={<Notification />}
            >
              <Route index element={<AllNotification />} />

              <Route path="Activities" element={<Activity />} />
              <Route path="system" element={<SystemMsg />} />
            </Route>
            <Route path="/indexx-exchange/careers" element={<Career />} />
            <Route path="/indexx-exchange/blog" element={<IndexBlog />} />
            <Route path="/indexx-exchange/welcome" element={<WelcomePage />} />
            <Route path="/indexx-exchange/account" element={<Account />} />
            <Route
              path="/indexx-exchange/account/email-auth"
              element={<BuySellVerifyEmail />}
            />
            <Route
              path="/indexx-exchange/change-password"
              element={<SecurityChange />}
            />
          </Routes>
        </BrowserRouter>
        <Footer />
        <div id="globalnav-curtain" className="globalnav-curtain"></div>
      </div>
    </ThemeContextUpdated>
  );
}

// function External() {
//
//     window.location.href = 'http://localhost:3002/';
//     return null;
// }

export default App;
