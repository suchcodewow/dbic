import Nav from "components/Nav";
import { useState, useEffect } from "react";
import { useUserContext } from "contexts/UserContext";
import {
  CreditCardIcon,
  InboxIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";

export default function MyAccount() {
  // Setup
  const { user, userDispatch } = useUserContext();
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_clientordersapi + "/myorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            AuthId: user.user,
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      setOrders(data);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <div>
      <Nav />
      {/* SideBar */}
      <div className="w-full z-10 top-0">
        <div className="mx-auto h-fit max-w-7xl px-2 sm:px-6 lg:px-8 flex">
          <aside className="pl-4 py-4 w-1/3 sticky" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-azure-700 text-white rounded-md">
              <ul className="space-y-2">
                <li className="mb-6">
                  <span className="ml-1 font-bold">Overview</span>
                </li>
                <li>
                  <div className="flex">
                    <CreditCardIcon className="w-5" />
                    <span className="font-bold mr-1 ml-3 whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#ae67fa] to-[#f49867]">
                      DYNACARD
                    </span>
                    <span>status: </span>
                    <span className="inline-flex justify-center items-center px-2 ml-3 text-xs font-medium text-gray-800 shadow-md bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      APPROVED
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex ">
                    <InboxIcon className="w-5" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Unread Messages
                    </span>
                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium  bg-azure-600 shadow-md rounded-full ">
                      0
                    </span>
                  </div>
                </li>
                <li>
                  <a
                    href="/store"
                    className="flex items-center p-2 text-base font-normal rounded-lg  hover:bg-azure-500"
                  >
                    <ShoppingBagIcon className="w-5" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Store</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/banking"
                    className="flex items-center p-2 text-base font-normal rounded-lg  hover:bg-azure-500"
                  >
                    <BanknotesIcon className="w-5" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Banking
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/insurance"
                    className="flex items-center p-2 text-base font-normal rounded-lg  hover:bg-azure-500"
                  >
                    <HomeIcon className="w-5" />
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      Insurance
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="mx-auto bg-white border  rounded-md m-4 w-full ml-5 p-5">
            <div className="mb-4 font-bold text-xl">My Orders</div>
            {/* table */}
            <div className="overflow-x-auto relative shadow-sm sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Order
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Total Items
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Total Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id} className="border-b bg-gray-100 ">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                      >
                        #{order.id}
                      </th>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                        {order.status}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                        {order.totalItems}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                        ${order.cartTotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-4 font-bold text-xl">Bank Accounts</div>
            <div className="my-4 font-bold text-xl">Insurance Policies</div>
          </div>
        </div>
      </div>
    </div>
  );
}
