import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from './redux/cryptoSlice';
import CryptoList from './components/CryptoList';
import CryptoDetails from './components/CryptoDetails';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch();

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // Get status from Redux store
  const status = useSelector((state) => state.crypto.status);

  // Handle loading and error states
  if (status === 'Loading') return <p>Loading...</p>;
  if (status === 'Failed') return <p>Error Fetching data.</p>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route path="/details/:id" element={<CryptoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
