"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ConversionCard = () => {
  // React-state management
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    // Fetch all crypto currency list
    const fetchCurrenciesList = async () => {
      try {
        const response = await fetch("/api/cryptocurrency/map");

        if (!response.ok) {
          throw new Error("Failed to load currencies");
        }

        const responseData = await response.json();

        if (responseData?.data?.length >= 2) {
          setFromCurrency(responseData.data[0]);
          setToCurrency(responseData.data[1]);
        }

        setCurrencies(responseData?.data || []);
      } catch (error) {
        toast.error(error.message || "Failed to load currency list.");
      }
    };

    fetchCurrenciesList();
  }, []);

  return (
    <div className="flex items-center justify-center text-white w-full">
      <div className="bg-[#1a1d24] p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-center">
          Cryptocurrency Converter
        </h1>

        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-semibold text-gray-300"
          >
            Amount :
          </label>
          <input
            id="amount"
            type="number"
            className="w-full bg-[#0e1117] border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <label
              htmlFor="fromCurrency"
              className="block text-sm font-semibold text-gray-300"
            >
              From :
            </label>
            <select
              className="w-full bg-[#0e1117] border border-gray-600 rounded-md p-3"
              id="fromCurrency"
            >
              <option>Select currency</option>
            </select>
          </div>

          <div className="flex justify-center items-center pt-6 md:pt-0">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              aria-label="Swap currencies"
            >
              ⇆
            </button>
          </div>

          <div className="w-full space-y-2">
            <label
              htmlFor="toCurrency"
              className="block text-sm font-semibold text-gray-300"
            >
              To :
            </label>
            <select
              className="w-full bg-[#0e1117] border border-gray-600 rounded-md p-3"
              id="toCurrency"
            >
              <option>Select currency</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md mt-4 disabled:opacity-50 cursor-pointer">
            Get Exchange Rate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionCard;
