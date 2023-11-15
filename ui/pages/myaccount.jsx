import Nav from "components/Nav";
import { useState, useEffect } from "react";
import { useUserContext } from "contexts/UserContext";
import { CreditCardIcon, InboxIcon, ShoppingBagIcon, BanknotesIcon, HomeIcon } from "@heroicons/react/20/solid";
import { NumericFormat } from "react-number-format";
import Footer from "components/footer";
import CollectiQuote from "components/CollecticareEdit";

export default function MyAccount() {
  // Setup

  const { user, userDispatch } = useUserContext();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(false);
  // Pull Orders
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientordersapi + "/myorders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          AuthId: user.user,
        },
      });
      const data = await response.json();
      // console.log(data);
      setOrders(data);
    };
    fetchData().catch(console.error);
  }, []);
  // Pull Bank Accounts
  const [accounts, setAccounts] = useState();
  const fetchAccounts = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/users/" + user.id, {
      method: "GET",
    });
    const data = await response.json();
    setAccounts(data.accounts);
  };

  // Pull Insurance Quotes
  const [quotes, setQuotes] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientquotesapi + "/my/" + user.user, {
        method: "GET",
      });
      const data = await response.json();
      setQuotes(data.data.data);
    };
    fetchData().catch(console.error);
  }, []);
  // Pull Custom Quotes
  const [customQuotes, setCustomQuotes] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_specialtyapi + "/my/" + user.user, {
        method: "GET",
      });
      const data = await response.json();
      setCustomQuotes(data);
      // console.log(data);
    };
    fetchData().catch(console.error);
    // }, [customQuotes]);
  }, []);
  useEffect(() => {
    fetchAccounts().catch(console.error);
  }, []);
  return (
    <div className="flex flex-col w-screen min-h-screen ">
      <Nav />
      <div className="mx-auto h-fit w-full px-2 sm:px-6 lg:px-8 flex-1">
        <CollectiQuote quoteOpen={quoteOpen} setQuoteOpen={setQuoteOpen} currentQuote={currentQuote} />
        <div className="flex max-w-7xl">
          {/* SideBar */}
          <aside className="pl-4 py-4 sticky" aria-label="Sidebar">
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
                    <span className="flex-1 ml-3 whitespace-nowrap">Unread Messages</span>
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
                    <span className="flex-1 ml-3 whitespace-nowrap">Banking</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/insurance"
                    className="flex items-center p-2 text-base font-normal rounded-lg  hover:bg-azure-500"
                  >
                    <HomeIcon className="w-5" />
                    <span className="flex-1 ml-3 whitespace-nowrap">Insurance</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="mx-auto bg-white border rounded-md m-4 w-full ml-5 p-5 flex-col flex-1">
            <div className="my-4 font-bold text-xl">
              Your CollectiCare<span className="align-super text-xs">(tm)</span> Specialty Quotes
            </div>
            <div className="overflow-x-auto relative shadow-sm sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Quote
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Last Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customQuotes?.map((quote) => (
                    <tr
                      key={quote._id}
                      onClick={() => {
                        setCurrentQuote(quote);
                        setQuoteOpen(true);
                      }}
                      className="border-b bg-gray-100 cursor-pointer"
                    >
                      <td className="py-2 pl-2 font-medium text-gray-900 whitespace-nowrap">{quote.CustRef}</td>
                      <td>{quote.Status}</td>
                      <td>{new Date(quote.UpdateTime).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-4 font-bold text-xl">My Orders</div>
            {/* orders table */}
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
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                        #{order.id}
                      </th>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{order.status}</td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{order.totalItems}</td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">${order.cartTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-4 font-bold text-xl">Bank Accounts</div>
            <div className="overflow-x-auto relative shadow-sm sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Account
                    </th>
                    <th scope="col" className="py-3 px-6">
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
            </div>
            <div className="my-4 font-bold text-xl">Insurance Policies</div>
            {/* insurance polices table */}
            <div className="overflow-x-auto relative shadow-sm sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Quote
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Type
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quotes?.map((quote) => (
                    <tr key={quote.id} className="border-b bg-gray-100 ">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                        {quote.id.slice(0, 7)}
                      </th>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">Home/Auto</td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{quote.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
