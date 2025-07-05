"use client";
import { useEffect, useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  // Define columns for the table
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Logo",
        accessorKey: "logo",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="logo"
            className="w-6 h-6 rounded-full"
          />
        ),
        enableSorting: false,
      },
      { header: "Scrip", accessorKey: "scrip" },
      {
        header: "Price (USD)",
        accessorKey: "price",
        cell: (info) => `$${info.getValue().toFixed(2)}`,
      },
      {
        header: "24h %",
        accessorKey: "change24h",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className={val < 0 ? "text-red-500" : "text-green-500"}>
              {val.toFixed(2)}%
            </span>
          );
        },
      },
      {
        header: "7d %",
        accessorKey: "change7d",
        cell: (info) => {
          const val = info.getValue();
          return (
            <span className={val < 0 ? "text-red-500" : "text-green-500"}>
              {val.toFixed(2)}%
            </span>
          );
        },
      },
    ],
    []
  );

  // Initialize the table
  const table = useReactTable({
    data: cryptoData ?? [],
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  useEffect(() => {
    fetchCryptoData();
  }, [pageIndex, pageSize]);

  return (
    <>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* Table wrapper */}
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="min-w-full border-collapse border border-gray-700">
              <thead className="bg-gray-900">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-3 text-left border-b border-gray-700 cursor-pointer select-none whitespace-nowrap"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <ChevronUp className="inline w-4 h-4 ml-1" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <ChevronDown className="inline w-4 h-4 ml-1" />
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {cryptoData?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center text-gray-400 py-3 text-lg"
                    >
                      No results found.
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-800">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="p-3 border-b border-gray-700 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default CryptoTable;
