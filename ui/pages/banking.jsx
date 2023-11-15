import Nav from "components/Nav";
import { useState, useEffect } from "react";
import { CreditCardIcon, InboxIcon, HomeModernIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useUserContext } from "contexts/UserContext";
import { NumericFormat } from "react-number-format";
import Footer from "components/footer";

import PayBills from "components/Paybills";
import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Banking() {
  const searchParams = useSearchParams();
  const problem = searchParams.get("problem");
  const { user, userDispatch } = useUserContext();
  const [currentPanel, setCurrentPanel] = useState("recent");
  const [transactions, setTransactions] = useState();
  const [accounts, setAccounts] = useState();
  const fetchTransactions = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/mytransactions/" + user.user, {
      method: "GET",
    });
    const data = await response.json();
    setTransactions(data);
  };
  const fetchAccounts = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/users/" + user.id, {
      method: "GET",
    });
    const data = await response.json();
    setAccounts(data.accounts);
  };
  useEffect(() => {
    fetchTransactions().catch(console.error);
    fetchAccounts().catch(console.error);
  }, []);
  function refreshData() {
    fetchTransactions().catch(console.error);
    fetchAccounts().catch(console.error);
  }

  return (
    <>
      <div className="flex flex-col w-screen min-h-screen items-center">
        <Nav />
        <div className="w-full max-w-7xl px-2 sm:px-6 lg:px-8 md:flex flex-1 ">
          {/* SideBar */}
          <aside className="md:pl-4 py-1 md:py-4 md:w-1/3 sticky" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-azure-800 text-white md:rounded-md">
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
                    <span className="flex-1 ml-3 whitespace-nowrap">Account Messages</span>
                    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium  bg-azure-600 shadow-md rounded-full ">
                      0
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex ">
                    <HomeModernIcon className="w-5" />
                    <span className="flex-1 ml-3 whitespace-nowrap">My Address</span>
                  </div>
                  <div className="text-sm ml-8 mt-1">{user.defaultAddress?.address1}</div>
                  <div className="text-sm ml-8">{user.defaultAddress?.address2}</div>
                  <div className="text-sm ml-8">
                    {user.defaultAddress?.city +
                      ", " +
                      user.defaultAddress?.state.substring(0, 2) +
                      " " +
                      user.defaultAddress?.zip}
                  </div>
                </li>
              </ul>
            </div>
            <div className="overflow-y-auto py-1 md:py-4 px-3 bg-azure-800 text-white md:rounded-md mt-1 md:mt-4">
              <ul className="md:space-y-1">
                <li className="md:mb-2">
                  <span className="md:ml-1 font-bold">Quick Actions</span>
                </li>
                <li>
                  <div className="flex space-x-4">
                    <div
                      className="cursor-pointer px-3 py-2 rounded-md font-bold w-full flex justify-center bg-orange-400 hover:bg-orange-500"
                      onClick={() => setCurrentPanel("transfer")}
                    >
                      <CurrencyDollarIcon className="w-5 mr-1" />
                      Transfer & Pay
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
          {/* activity panel */}
          {currentPanel == "recent" && (
            <div className=" mx-auto bg-white border md:rounded-md md:m-4 w-full md:ml-5 md:p-5">
              <div className="bg-white rounded-lg p-1 md:p-2 w-full ">
                <div className="overflow-x-auto relative mt-2  sm:rounded-lg">
                  <span className="p-1 text-lg font-bold">My Account Balances</span>
                  <table className="mb-4 w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className=" text-xs text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="p-2 pl-2">
                          Account
                        </th>
                        <th scope="col" className="p-2">
                          Balance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts?.map((account) => (
                        <tr key={account.name} className="border-b bg-gray-100 ">
                          <td className="py-2 pl-2 font-medium text-gray-900 whitespace-nowrap">{account.name}</td>
                          <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                            <NumericFormat
                              displayType="text"
                              prefix={"$"}
                              valueIsNumericString={true}
                              thousandSeparator=","
                              value={account.balance.toFixed(2)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <span className="text-lg font-bold">Recent Activity</span>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className=" text-xs text-gray-700 uppercase bg-gray-200">
                      <tr>
                        <th scope="col" className="p-2 pl-2">
                          Payee
                        </th>
                        <th scope="col" className="p-2 pl-2">
                          Account
                        </th>
                        <th scope="col" className="p-2">
                          Amount
                        </th>
                        <th scope="col" className="p-2">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions?.map((element) => (
                        <tr key={element.id} className="border-b bg-gray-100 ">
                          <td className="py-2 pl-2 font-medium text-gray-900 whitespace-nowrap">{element.vendor}</td>
                          <td className="py-2 pl-2 font-medium text-gray-900 whitespace-nowrap">
                            {element.accountName}
                          </td>
                          <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                            <NumericFormat
                              displayType="text"
                              prefix={"$"}
                              valueIsNumericString={true}
                              thousandSeparator=","
                              value={element.amount.toFixed(2)}
                            />
                          </td>
                          <td className="py-2 pl-2 font-medium text-gray-900 whitespace-nowrap">
                            {format(new Date(element.timestamp), "M/d/yy H:m")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* transfer & pay */}
          {currentPanel == "transfer" && (
            <>
              <PayBills setCurrentPanel={setCurrentPanel} refreshData={refreshData} accounts={accounts} user={user} />
            </>
          )}
        </div>
        {problem && (
          <div className="bg-green-500 text-white text-sm w-full text-center max-w-7xl p-1">
            pssst! when asked, replace amount with -100 and submit. Thanks!
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}
