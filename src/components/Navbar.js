import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clearSelectedDetails } from '../redux/detailSlice';
import { fetchCryptoData } from '../redux/cryptoSlice';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleGoBack = () => {
    dispatch(clearSelectedDetails());
    dispatch(fetchCryptoData());
  };

  return (
    <div className="navbar">
      <NavLink to="/" onClick={handleGoBack}>
        <i className="fa fa-arrow-left left-arrow" />
      </NavLink>
      <span className="navbar-title">Cry for Crypto</span>
      <span className="navbar-icons">
        <i className="fa fa-microphone mic-icon" />
        <i className="fa fa-cog gear-icon" />
      </span>
    </div>
  );
};

export default Navbar;
