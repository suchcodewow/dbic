import { WrenchIcon } from "@heroicons/react/24/outline";
import Nav from "components/Nav";
import Footer from "components/footer";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Operations() {
  const [creditService, setCreditService] = useState(true);
  const [distributionService, setDistributionService] = useState(false);
  const [failuronService, setFailuronService] = useState(true);
  const [fosService, setFosService] = useState(false);
  const [fraudService, setFraudService] = useState(false);
  const [mainframeService, setMainframeService] = useState(true);
  const [monsterService, setMonsterService] = useState(true);
  const [terminatorService, setTerminatorService] = useState(false);
  const [transactionService, setTransactionService] = useState(false);

  const fetchTransactionsFlags = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/features/", {
      method: "GET",
    });
    const data = await response.json();
    setFraudService(data.fraud_service);
    setTransactionService(data.transaction_service);
  };

  const enableFraudService = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/features/enable/fraud_service", {
      method: "GET",
    });
    const data = await response.json();
    toast.success("Fraud Service Enabled");
    fetchTransactionsFlags();
  };

  const disableFraudService = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/features/disable/fraud_service", {
      method: "GET",
    });
    const data = await response.json();
    toast.success("Fraud Service Disabled");
    fetchTransactionsFlags();
  };

  const enableTransactionService = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/features/enable/transaction_service", {
      method: "GET",
    });
    const data = await response.json();
    toast.success("Transaction Service Enabled");
    fetchTransactionsFlags();
  };

  const disableTransactionService = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/features/disable/transaction_service", {
      method: "GET",
    });
    const data = await response.json();
    toast.success("Transaction Service Disabled");
    fetchTransactionsFlags();
  };

  useEffect(() => {
    fetchTransactionsFlags();
    // console.log(fraudService);
  }, []);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-white ">
      <Nav />
      <div className="flex h-full p-4 py-2">
        <WrenchIcon className="w-8 " />
        <h1 className=" text-4xl font-bold ml-2">Operations</h1>
      </div>
      <div className="mt-10 px-4 sm:px-6 lg:px-8 flex-1">
        <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-14  md:gap-y-10 md:space-y-0">
          {/* Credit Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  creditService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Credit Service</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setCreditService(true);
                  toast.success("Credit Service Enabled");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  setCreditService(false);
                  toast.success("Credit Service Disabled");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Distribution Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  distributionService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Distribution Service</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setDistributionService(true);
                  toast.success("Distribution service enabled");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  setDistributionService(false);
                  toast.success("Distribution service disabled");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Failuron Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  failuronService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Failuron Service</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setFailuronService(true);
                  toast.success("Failuron service enabled");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  setFailuronService(false);
                  toast.success("Failuron service disabled");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Fos Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  fosService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Factory of Sadness</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setFosService(true);
                  toast.success("Browns game scheduled");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  setFosService(false);
                  toast.success("Browns game cancelled");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Fraud Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  fraudService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Fraud Detection Service</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={enableFraudService}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={disableFraudService}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Mainframe Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  mainframeService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Mainframe Services</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setMainframeService(true);
                  toast.success("Mainframe services enabled");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  setMainframeService(false);
                  toast.success("Mainframe services disabled");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Monster Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  monsterService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Door Delivery System</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setMonsterService(true);
                  toast.success("Factory door delivery started");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  setMonsterService(false);
                  toast.success("Factory door delivery stopped");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Terminator Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  terminatorService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Model 101E Assembly Line</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={() => {
                  setTerminatorService(true);
                  toast.success("Model 101E Assembly Started");
                }}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={() => {
                  toast.error("Cyberdyne denied authorization");
                }}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
          {/* Transaction Service */}
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  transactionService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Transaction Services</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div
                onClick={enableTransactionService}
                className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer"
              >
                enable
              </div>
              <div
                onClick={disableTransactionService}
                className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer"
              >
                disable
              </div>
            </dd>
          </div>
        </dl>
        <div className="h-32"></div>
      </div>
      <Footer />
    </div>
  );
}
