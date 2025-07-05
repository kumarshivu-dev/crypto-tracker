"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import TableSkeleton from "@/components/common/TableSkeleton";

const CryptoTable = () => {
  // React state decalarations
  const [isLoading, setIsLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [totalCount, setTotalCount] = useState(10000);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [symbol, setSymbol] = useState("USD");

  const totalPages = Math.ceil(totalCount / pageSize);

  // Fetch crypto currency latest data from API
  const fetchCryptoData = async () => {
    setIsLoading(true);
    const start = pageIndex * pageSize + 1;
    try {
      const response = await fetch(
        `/api/cryptocurrency/listings/latest?start=${start}&limit=${pageSize}&convert=${symbol}`
      );
      if (!response.ok) throw new Error("Failed to fetch crypto data.");
      const responseData = await response.json();

      const formattedData = responseData?.data.map((coin, idx) => ({
        id: start + idx,
        logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
        scrip: `${coin.name} (${coin.symbol})`,
        price: parseFloat(coin.quote.USD.price),
        change24h: coin.quote.USD.percent_change_24h,
        change7d: coin.quote.USD.percent_change_7d,
      }));

      setTotalCount(responseData?.status?.total_count || 10000);
      setCryptoData(formattedData ?? []);
    } catch (error) {
      toast.error(error?.message || "Error loading data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return <>{isLoading ? <TableSkeleton /> : null}</>;
};

export default CryptoTable;
