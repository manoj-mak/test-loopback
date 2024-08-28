import { useState } from "react";

const TestLoopback = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const fetchData = async (path) => {
    setLoading(true);
    const response = await fetch(
      `https://loopback-api-f2ixa7hrsq-uc.a.run.app${path}`
    );
    const data = await response.json();
    console.log(data);
    setData(data);
    setLoading(false);
  };

  const handleClick = (path) => {
    fetchData(path);
    setActiveButton(path);
  };

  const buttons = [
    { path: "/getAllPolicies", label: "All Policies" },
    { path: "/getActivePolicies", label: "Active Policies" },
    { path: "/getExpiredPolicies", label: "Expired Policies" },
    { path: "/getRenewablePolicies", label: "Renewable Policies" },
  ];

  return (
    <div className="p-4 w-full ">
      <h1 className="text-3xl sm:text-5xl text-center my-4 sm:my-8">
        Test Loopback
      </h1>

      <p className="text-center mb-4 sm:mb-8">
        Initial request may take a while as the server is booting.
      </p>

      <div className="flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-2 sm:gap-4">
        <>
          {buttons.map((button) => (
            <button
              key={button.path}
              className={`font-bold py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto
                 ${
                   activeButton === button.path
                     ? "bg-blue-700 text-white"
                     : "bg-blue-500 hover:bg-blue-600 text-white"
                 }`}
              onClick={() => handleClick(button.path)}
            >
              {button.label}
            </button>
          ))}
        </>
      </div>

      {loading ? (
        <p className="text-center mt-4 sm:mt-8">Fetching...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 sm:mt-8">
          {data?.map((item, index) => (
            <div
              key={index}
              className="bg-slate-700 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200"
            >
              <p className="text-xl font-semibold text-white">
                {item.policyNumber}
              </p>
              <p className="text-sm text-gray-400 mt-2">{item.policyHolder}</p>
              <div className="text-sm text-gray-400 mt-4">
                <p>Start: {item.startDate}</p>
                <p>End: {item.endDate}</p>
              </div>
              <p className="text-sm mt-4">
                Status:{" "}
                <span
                  className={`font-medium ${
                    item.status === "Active" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestLoopback;
