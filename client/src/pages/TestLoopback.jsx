import { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";

const TestLoopback = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (path) => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000${path}`);
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoading(false);
  };

  const handleClick = (path) => {
    fetchData(path);
  };

  return (
    <div>
      <h1 className="text-5xl text-center my-8">Test Loopback</h1>
      <div className="flex justify-center flex-row space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleClick("/getAllPolicies")}
        >
          /getAllPolicies
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleClick("/getActivePolicies")}
        >
          /getActivePolicies
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleClick("/getExpiredPolicies")}
        >
          /getExpiredPolicies
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleClick("/getRenewablePolicies")}
        >
          /getRenewalPolicies
        </button>
      </div>
      {loading ? (
        <p className="text-center mt-8"> Fetching...</p>
      ) : (
        <div className="flex justify-start flex-row space-x-2 flex-wrap mt-8">
          {data?.map((item, index) => (
            <div key={index} className="flex justify-center p-4">
              <div className="w-full max-w-sm bg-slate-700 py-6 px-10 rounded-lg shadow-lg border border-gray-200 flex flex-col space-y-2 sm:space-y-4">
                <p className="text-lg font-semibold text-white-700">
                  {item.policyNumber}
                </p>
                <p className="text-sm text-gray-500">{item.policyHolder}</p>
                <div className="text-sm flex flex-col sm:flex-row sm:justify-start space-x-1">
                  <span className="text-gray-400">Start: </span>
                  <span className="text-gray-400"> {item.startDate}</span>
                </div>
                <div className="text-sm flex flex-col sm:flex-row sm:justify-start space-x-1">
                  <span className="text-gray-400">End: </span>
                  <span className="text-gray-400">{item.endDate}</span>
                </div>
                <div className="text-sm flex flex-col sm:flex-row sm:justify-start space-x-1">
                  <span className="text-gray-400">Status: </span>
                  <span
                    className={`font-medium ${
                      item.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestLoopback;
