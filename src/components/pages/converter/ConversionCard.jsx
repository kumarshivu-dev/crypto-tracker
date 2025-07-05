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

  // Swap the selected currencies
  const handleSwapCurrency = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Handle input changes for amount and currency selections
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "amount") {
      setAmount(Number(value));
    } else if (id === "fromCurrency") {
      // Find and set selected "from" currency object by ID
      const selected = currencies.find((c) => c.id === Number(value));
      setFromCurrency(selected);
    } else if (id === "toCurrency") {
      // Find and set selected "to" currency object by ID
      const selected = currencies.find((c) => c.id === Number(value));
      setToCurrency(selected);
    }

    // Reset conversion result whenever input changes
    setConversionResult(null);
  };

  // Fetch the latest conversion rate based on selected currencies and amount
  const fetchConversionRate = async () => {
    // Validate input amount
    if (!amount || amount < 0) {
      toast.error("Please enter valid amount.");
      return;
    }

    // Ensure both currencies are selected
    if (!fromCurrency || !toCurrency) {
      toast.error("Please select both currencies.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/tools/price-conversion?amount=${amount}&id=${fromCurrency.id}&convert=${toCurrency.symbol}`
      );

      if (!response.ok) throw new Error("Conversion failed.");

      const responseData = await response.json();

      const convertedValue =
        responseData?.data?.quote?.[toCurrency.symbol]?.price;

      if (!convertedValue) throw new Error("Conversion rate not found.");

      setConversionResult(convertedValue);
    } catch (error) {
      toast.error(error.message || "Failed to fetch conversion rate.");
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* Title  */}
        <h1 className="text-2xl font-semibold text-center">
          Cryptocurrency Converter
        </h1>

        {/* Amount input field */}
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
            value={amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="w-full bg-[#0e1117] border border-gray-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Currency selection and swap button section */}
        <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
          {/* From currency dropdown */}
          <div className="w-full space-y-2">
            <label
              htmlFor="fromCurrency"
              className="block text-sm font-semibold text-gray-300"
            >
              From :
            </label>
            <select
              id="fromCurrency"
              className="w-full bg-[#0e1117] border border-gray-600 rounded-md p-3"
              value={fromCurrency?.id || ""}
              onChange={handleInputChange}
            >
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <div className="flex justify-center items-center pt-6 md:pt-0">
            <button
              onClick={handleSwapCurrency}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
              aria-label="Swap currencies"
            >
              ⇆
            </button>
          </div>

          {/* To currency dropdown */}
          <div className="w-full space-y-2">
            <label
              htmlFor="toCurrency"
              className="block text-sm font-semibold text-gray-300"
            >
              To :
            </label>
            <select
              id="toCurrency"
              className="w-full bg-[#0e1117] border border-gray-600 rounded-md p-3"
              value={toCurrency?.id || ""}
              onChange={handleInputChange}
            >
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conversion Result  */}
        {conversionResult !== null && !isLoading && (
          <div className="text-center text-lg mt-4">
            {amount} {fromCurrency.name} ({fromCurrency.symbol}) ={" "}
            <span className="font-semibold">
              {conversionResult.toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })}{" "}
              {toCurrency.name} ({toCurrency.symbol})
            </span>
          </div>
        )}

        {/* Button to fetch conversion rate */}
        <div className="flex justify-center">
          <button
            onClick={fetchConversionRate}
            disabled={isLoading || currencies.length <= 0}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md mt-4 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Fetching..." : "Get Exchange Rate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionCard;
