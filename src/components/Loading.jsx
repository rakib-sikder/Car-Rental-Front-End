import React from 'react';

const Loading = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
        
        <div className="hero-content flex-col lg:flex-row-reverse">
          
          <div className="text-center lg:text-left">
            
            <h1 className="text-5xl font-bold"><span className="loading loading-infinity loading-lg"></span></h1>{" "}
          </div>
        </div>
      </div>
    );
};

export default Loading;