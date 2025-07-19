import React from "react";
import bt from "../../assets/images/icons/icon-white-bitcoin.svg";

const CountCard = () => {
  return (
    <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-12">
      <div className="card shadow-none bg-purple-200 dark:bg-purple-800 w-full rounded-md">
        <div className="card-body p-6">
          <div className="flex items-center">
            <div className="rounded-md bg-primary w-11 h-11 flex items-center justify-center">
              <img
                src={bt}
                className="h-6 w-6"
                alt="icon"
              />
            </div>
            <h6 className="mb-0 ms-3">BTC</h6>
            <div className="ms-auto text-primary flex gap-1 items-center">
              <i className="ti ti-trending-up text-primary text-xl" />
              <span className="text-xs font-semibold text-primary">
                + 2.30%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-5">
            <h3 className="text-2xl">0.1245</h3>
            <span className="font-semibold card-subtitle opacity-70">
              $1,015.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountCard;
