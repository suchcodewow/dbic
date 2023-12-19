import { KeyIcon } from "@heroicons/react/24/outline";
import Nav from "components/Nav";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Footer from "components/footer";
import CollectiAdmin from "components/CollecticareAdmin";
import { NumericFormat } from "react-number-format";
//TODO: make all 3 transactions recent down
//TODO: fix money field. negatives are wrong
export default function Administration() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(false);
  //Collecticare data
  const [customQuotes, setCustomQuotes] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_specialtyapi + "/api", {
        method: "GET",
      });
      const data = await response.json();
      setCustomQuotes(data);
    };
    fetchData().catch(console.error);
  }, []);
  //Shop data
  const [orders, setOrders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientordersapi, {
        method: "GET",
      });
      const data = await response.json();
      setOrders(data);
    };
    fetchData().catch(console.error);
  }, []);
  //Insurance Data
  const [quotes, setQuotes] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientquotesapi, {
        method: "GET",
      });
      const data = await response.json();
      setQuotes(data.data.data);
    };
    fetchData().catch(console.error);
  }, []);
  //Banking Data
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/transactions", {
        method: "GET",
      });
      const data = await response.json();
      // console.log(data);
      setTransactions(data);
    };
    fetchData().catch(console.error);
  }, []);
  const timezoneOffset = new Date().getTimezoneOffset();

  // console.log(timezoneOffset);
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <Nav />
      <div className="flex p-4 py-2">
        <KeyIcon className="w-8 " />
        <h1 className=" text-4xl font-bold ml-2">Administration</h1>
      </div>
      <div className="flex gap-4 justify-around p-2 flex-1 ">
        <CollectiAdmin quoteOpen={quoteOpen} setQuoteOpen={setQuoteOpen} currentQuote={currentQuote} />
        <div className="bg-white rounded-lg shadow p-2 w-full">
          <span className="p-1 ">Collecticare Quotes</span>
          <div className="overflow-x-auto relative mt-2 rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className=" text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="p-1">
                    Ref
                  </th>
                  <th scope="col" className="p-1">
                    Status
                  </th>
                  <th scope="col" className="p-1">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {customQuotes?.map((item) => (
                  <tr
                    onClick={() => {
                      setCurrentQuote(item);
                      setQuoteOpen(true);
                    }}
                    key={item._id}
                    className="border-b bg-gray-50 hover:bg-blue-100 cursor-pointer "
                  >
                    <th scope="row" className="p-1 font-medium text-gray-900 whitespace-nowrap ">
                      {item.CustRef}
                    </th>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">{item.Status}</td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      {format(new Date(item.UpdateTime), "M/d/yy H:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg  shadow p-2 w-full">
          <span className="p-1 ">Shop Orders</span>

          <div className="overflow-x-auto relative mt-2 shadow-sm sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className=" text-gray-700 uppercase bg-gray-200">
                <tr>
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
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">#{order.id}</td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">{order.name}</td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">${order.cartTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg  shadow p-2 w-full">
          <span className="p-1 ">Banking Transactions</span>

          <div className="overflow-x-hidden relative shadow-sm mt-2 sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="p-1">
                    Customer
                  </th>
                  <th scope="col" className="p-1">
                    Vendor
                  </th>
                  <th scope="col" className="p-1">
                    Amount
                  </th>
                  <th scope="col" className="p-1">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction) => (
                  <tr key={transaction.id} className="border-b bg-gray-100 ">
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap ">{transaction.userId}</td>
                    <td className="p-1 text-xs font-medium text-gray-900 whitespace-nowrap">{transaction.vendor}</td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">
                      <NumericFormat
                        displayType="text"
                        prefix={"$"}
                        valueIsNumericString={true}
                        thousandSeparator=","
                        value={transaction.amount.toFixed(2)}
                      />
                    </td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap ">
                      {format(new Date(transaction.timestamp), "M/d/yy H:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg  shadow  p-2 w-full">
          <span className="p-1 ">Quote Management</span>
          <div className="overflow-x-auto relative mt-2  sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="p-1">
                    Customer
                  </th>
                  <th scope="col" className="p-1">
                    Quote
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotes?.map((quote) => (
                  <tr key={quote.id} className="border-b bg-gray-100 ">
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap">{quote.name}</td>
                    <td className="p-1 font-medium text-gray-900 whitespace-nowrap ">{quote.id.slice(18)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
