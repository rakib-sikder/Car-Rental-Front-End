import React from "react";

const Newsletter = () => {
  return (
    <div className="p-4 sm:p-8 bg-neutral-50">
      <form className="max-w-lg mx-auto text-center">
        <h6 className="text-xl sm:text-2xl font-bold mb-2">Stay in the loop</h6>
        <p className="text-neutral-500 mb-5">Subscribe to our newsletter and get the latest updates on our cars.</p>
        <fieldset className="form-control w-full">

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered flex-grow rounded-full"
            />
            <button className="btn btn-primary rounded-full">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Newsletter;