import React from 'react';
import Banner from '../components/Banner';
import WhyChooseUs from '../components/WhyChooseUs';
import RecentListings from '../components/RecentList';
import SpecialOffers from '../components/SpcialOffer';
import OurCommitment from '../components/OurCommitment';
import Newsletter from '../components/Newsletter';

const Home = () => {
    return (
        <div>
               <Banner></Banner> 
               <WhyChooseUs></WhyChooseUs>
               <RecentListings></RecentListings>
               <SpecialOffers></SpecialOffers>
               <OurCommitment></OurCommitment>
               <Newsletter></Newsletter>
        </div>
    );
};

export default Home;