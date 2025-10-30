import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

// Keep-alive function to prevent Render server from sleeping
const setupKeepAlive = () => {
  const pingServer = async () => {
    try {
      // Using the root endpoint to keep the server awake
      await fetch('/');
      console.log('Keep-alive ping successful at:', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Keep-alive ping failed:', error);
    }
  };

  // Initial ping
  pingServer();
  
  // Set up interval for subsequent pings (30 seconds)
  const intervalId = setInterval(pingServer, 30000);
  
  // Cleanup function to clear interval when component unmounts
  return () => clearInterval(intervalId);
};

function App() {
  useEffect(() => {
    const cleanup = setupKeepAlive();
    return cleanup; // This will clear the interval when the component unmounts
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/experience/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/result/:bookingId" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
