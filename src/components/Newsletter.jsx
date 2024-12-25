import React from "react";

const Newsletter = () => {
  return (
    <div className="p-4 sm:p-8 bg-base-100">
      <form className="max-w-lg mx-auto">
        <h6 className="footer-title text-center text-xl sm:text-2xl font-bold mb-4">Newsletter</h6>
        <p className="text-center mb-4">Subscribe to our newsletter and get the latest updates on our cars.</p>
        <fieldset className="form-control w-full">
          
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered flex-grow"
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Newsletter;