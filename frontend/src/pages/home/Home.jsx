import React from 'react';
import Banner from './Banner';
import TopSellers from './TopSellers';
import AppointmentBooking from './AppointmentBooking'; 
import News from './News';

const Home = () => {
  return (
    <>
      <Banner />
      <TopSellers />
      <AppointmentBooking />
      <News />
    </>
  );
};

export default Home;
