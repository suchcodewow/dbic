import { useForm } from "react-hook-form";

export default function PayBills({ setCurrentPanel, refreshData }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    refreshData().catch(console.error);
  };
  return (
    <div className=" mx-auto bg-white m-4 w-full ml-5 p-5  rounded-md">
      <div className="mb-4 font-bold text-xl">Pay a bill</div>
      <div className="flex align-bottom w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4 flex w-full">
            <label>Payee</label>
            <input
              {...register("payee")}
              className="border mr-2 p-2 text-sm w-full"
            />

            <label>amount</label>
            <input
              {...register("amount")}
              className="border mr-2 p-2 text-sm"
            />

            <button
              className="bg-azure-400 hover:bg-azure-500 text-xs uppercase h-8 px-6 py-2 rounded-full text-white"
              type="submit"
            >
              Send Payment
            </button>
          </div>
        </form>
      </div>
      <div className="overflow-x-auto relative">
        <button
          className="bg-gray-600 hover:bg-azure-500 text-xs uppercase px-6 py-2 rounded-full text-white"
          onClick={() => setCurrentPanel("recent")}
        >
          back
        </button>
      </div>
    </div>
  );
}
