import React from 'react';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListings from '../components/RecentList';

const Home = () => {
    return (
        <div>
               <Banner></Banner> 
               <WhyChooseUs></WhyChooseUs>
               <RecentListings></RecentListings>
        </div>
    );
};

export default Home;