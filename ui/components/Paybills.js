import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postTransaction, payees } from "./Library";
import toast from "react-hot-toast";

export default function PayBills({ setCurrentPanel, refreshData, user, accounts }) {
  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const randomPayee = payees[Math.floor(Math.random() * payees.length)];
  //Form Validation Config & Imports
  const schema = yup
    .object()
    .shape({
      vendor: yup.string().required(),
      accountName: yup.string().required(),
      amount: yup.number().test("isvalid", "Valid Number", (value, context) => value > 0 || value == -100),
    })
    .required();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onBlur" });
  //Form Submit
  const onSubmit = async (data) => {
    data.userId = user.user;
    data.id = user.id;
    const postSuccess = await postTransaction(data);
    console.log("postback", postSuccess);
    refreshData();
    setCurrentPanel("recent");
    switch (postSuccess) {
      case "transaction added":
        toast.success("Payment Successful");
        break;
      case "dbissuestart":
        toast.success("Payment Succes...*KABOOM*");
        break;
      case "dberror":
        toast.error("ERR-1091 Transaction Failed");
        break;
    }

    // console.log(data);
  };

  return (
    <div className=" mx-auto bg-white md:m-4 w-full md:ml-5 p-5  md:rounded-md">
      <div className="mb-4 font-bold text-xl">Pay a bill</div>
      <div className="flex align-bottom w-full">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden sm:rounded-md w-full">
            <div className="bg-white px-4  w-full"></div>
            <div className="grid grid-cols-6 gap-6 p-2 w-full">
              <div className="col-span-6">
                <label htmlFor="vendor" className="text-sm font-medium text-gray-700 inline">
                  Payee
                </label>
                {errors.vendor && (
                  <label className="ml-2 text-bold text-sm text-white bg-crimson-800 rounded-md px-3">
                    payee needed
                  </label>
                )}
                <input
                  {...register("vendor")}
                  type="text"
                  name="vendor"
                  id="vendor"
                  autoComplete="vendor"
                  defaultValue={randomPayee}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure-500 focus:ring-azure-500 sm:text-sm"
                />
              </div>
              <div className="col-span-3">
                <label htmlFor="accountName" className="text-sm font-medium text-gray-700 inline">
                  From Account
                </label>
                {errors.accountName && (
                  <label className="ml-2 text-bold text-sm text-white  bg-crimson-800 rounded-md px-3">
                    "{errors.accountName.message}"
                  </label>
                )}
                <select
                  {...register("accountName")}
                  type="text"
                  name="accountName"
                  id="accountName"
                  autoComplete="accountName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure-500 focus:ring-azure-500 sm:text-sm"
                >
                  {accounts?.map((account) => (
                    <option key={account.name} value={account.name}>
                      {account.name == "Dynacard" ? "Dynacard (+$22.00 cash advance fee)" : account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-3">
                <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Payment Amount
                </label>
                {errors.amount && (
                  <label className="ml-2 text-bold text-sm text-white bg-crimson-800 rounded-md px-3">
                    paymount amount required
                  </label>
                )}
                <input
                  {...register("amount")}
                  type="text"
                  name="amount"
                  id="amount"
                  autoComplete="amount"
                  defaultValue={randomNumber(50, 200)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-azure-500 focus:ring-azure-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-azure-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-azure-700 focus:outline-none focus:ring-2 focus:ring-azure-500 focus:ring-offset-2"
              >
                Send Payment
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto relative">
        <button
          className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-azure-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-azure-700 focus:outline-none focus:ring-2 focus:ring-azure-500 focus:ring-offset-2"
          onClick={() => setCurrentPanel("recent")}
        >
          back
        </button>
      </div>
    </div>
  );
}
