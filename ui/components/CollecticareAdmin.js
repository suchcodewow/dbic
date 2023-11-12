import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CollectiAdmin({ quoteOpen, setQuoteOpen, currentQuote }) {
  const router = useRouter();
  // Accept Quote (likely not used on administrator page)
  async function AcceptQuote() {
    const body = { Status: "accepted" };
    const options = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(currentQuote._id);
    const apicall = await fetch(process.env.NEXT_PUBLIC_specialtyapi + "/" + currentQuote._id, options);
    toast.success("Quote Accepted!");
    router.refresh();
  }
  // Quote proposal
  async function proposal() {
    console.log(currentQuote.CustRef);
  }
  return (
    <Transition.Root show={quoteOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setQuoteOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 max-w-3xl">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                      <EnvelopeOpenIcon className="h-6 w-6 text-green-300" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {currentQuote.CustRef}
                      </Dialog.Title>
                      <div className="mt-2">
                        <table>
                          <tbody>
                            <tr>
                              <td>Item Name:</td>
                              <td className="pl-2">{currentQuote.ItemName}</td>
                            </tr>
                            <tr>
                              <td>Item Description:</td>
                              <td className="pl-2">{currentQuote.ItemDesc}</td>
                            </tr>
                            <tr>
                              <td>Item Year:</td>
                              <td className="pl-2">{currentQuote.CreateYear}</td>
                            </tr>
                            <tr>
                              <td>Insurance Type:</td>
                              <td className="pl-2">{currentQuote.InsuranceType}</td>
                            </tr>
                            <tr>
                              <td>Declared Value:</td>
                              <td className="pl-2">${currentQuote.ItemValue}.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {currentQuote.Status == "new" && (
                    <div className="m-5 p-8 ">
                      <p>Enter yearly quote amount provided by underwriting:</p>
                      <form action={proposal}>
                        <input name="proposal" />
                        <button
                          type="submit"
                          className="inline-flex  justify-center rounded-md bg-green-300 hover:bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ml-3 w-auto"
                        >
                          Submit Policy Cost
                        </button>
                      </form>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {currentQuote.Status == "quoted" && (
                    <button
                      type="button"
                      className="inline-flex  justify-center rounded-md bg-green-300 hover:bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ml-3 w-auto"
                      onClick={(currentQuote) => {
                        AcceptQuote(currentQuote);
                        setQuoteOpen(false);
                      }}
                    >
                      Accept Policy!
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setQuoteOpen(false)}
                    // ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
