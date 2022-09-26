import { KeyIcon } from "@heroicons/react/24/outline";
import Nav from "components/Nav";
import { useState, useEffect } from "react";

export default function Administration() {
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientordersapi, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };
    fetchData().catch(console.error);
  }, []);
  const [quotes, setQuotes] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientquotesapi, {
        method: "GET",
      });
      const data = await response.json();
      setQuotes(data.data.data);
      console.log(data.data);
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="flex p-4 py-2">
        <KeyIcon className="w-8 " />
        <h1 className=" text-4xl font-bold ml-2">Administration</h1>
      </div>
      <div className="flex gap-4 justify-around p-2">
        <div className="bg-white rounded-lg  shadow p-2 w-full">
          <span className="p-1 ">Shop Orders</span>

          <div className="overflow-x-auto relative shadow-sm sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="p-1">
                    Status
                  </th>
                  <th scope="col" className="p-1">
                    Order
                  </th>
                  <th scope="col" className="p-1">
                    Customer
                  </th>
                  <th scope="col" className="p-1">
                    Total Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order.id} className="border-b bg-gray-100 ">
                    <th
                      scope="row"
                      className="p-1 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {order.status}
                    </th>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      #{order.id}
                    </td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      {order.name}
                    </td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      ${order.cartTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg  shadow p-2 w-full">
          Bank Accounts
        </div>
        <div className="bg-white rounded-lg  shadow  p-2 w-full">
          <span className="p-1 ">Quote Management</span>
          <div className="overflow-x-auto relative mt-1  sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="p-1">
                    Status
                  </th>
                  <th scope="col" className="p-1">
                    Customer
                  </th>
                  <th scope="col" className="p-1">
                    Quote
                  </th>
                  <th scope="col" className="p-1">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotes?.map((quote) => (
                  <tr key={quote.id} className="border-b bg-gray-100 ">
                    <td className="py-1 font-medium text-gray-900 whitespace-nowrap">
                      {quote.status}
                    </td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      {quote.name}
                    </td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap ">
                      {quote.id.slice(0, 7)}
                    </td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      Home/Auto
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
