import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs  from "./components/AboutUs";
import Application from './pages/Application';
import Services from './components/Services';
import Prices from './components/Prices';
import Benefits from './components/Benefits';
import Cta from './components/Cta';
import Footer from './components/Footer';

function Home() {
    return (
        <>
            <Helmet>
                <title>Ен Такси Стара Загора | Бързи и надеждни таксиметрови услуги</title> 
                <meta name="description" content="Ен Такси Стара Загора предлага бързи и надеждни таксиметрови услуги. Поръчай такси лесно чрез нашето мобилно приложение или на телефон." />
            </Helmet>
            <Hero />
            <Services />
            <AboutUs />
            <Prices />
            <Benefits />
            <Cta />
        </>
    
    )
}

export default function App() {
  return (
    <BrowserRouter basename="/nttaxi">
        <div className="min-h-screen bg-bg">
           <Header />
             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/application" element={<Application />} />

            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
  );
}


