import { WrenchIcon } from "@heroicons/react/24/outline";
import Nav from "components/Nav";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Operations() {
  const [fraudService, setFraudService] = useState(false);
  const [failuronService, setFailuronService] = useState(false);
  const [fosService, SetFosService] = useState(false);
  const fetchTransactionsFlags = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_clientmainapi + "/features/", {
      method: "GET",
    });
    const data = await response.json();
    setFraudService(data.fraud_service);
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

  useEffect(() => {
    fetchTransactionsFlags();
    console.log(fraudService);
  }, []);

  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="flex p-4 py-2">
        <WrenchIcon className="w-8 " />
        <h1 className=" text-4xl font-bold ml-2">Operations</h1>
      </div>
      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-14  md:gap-y-10 md:space-y-0">
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  fraudService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">Fraud Service</p>
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
              <div className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer">
                enable
              </div>
              <div className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer">
                disable
              </div>
            </dd>
          </div>
          <div className="relative">
            <dt>
              <div
                className={classNames(
                  fosService ? "bg-green-500" : "bg-gray-400",
                  "absolute flex h-12 w-12 items-center justify-center rounded-md text-white"
                )}
              ></div>
              <p className="ml-16 text-lg font-medium leading-6 text-gray-900">FactoryOfSadness Service</p>
            </dt>
            <dd className="mt-2 ml-16 text-base text-gray-500 flex">
              <div className="bg-green-500 hover:bg-green-600 shadow-md py-2 px-6 text-white rounded-full cursor-pointer">
                enable
              </div>
              <div className="bg-gray-400 hover:bg-gray-500 shadow-md ml-1 py-2 px-6 text-white rounded-full cursor-pointer">
                disable
              </div>
            </dd>
          </div>
        </dl>
        <div className="h-32"></div>
      </div>
    </div>
  );
}
