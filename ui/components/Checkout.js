// Imports
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, HomeModernIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "contexts/CartContext";
import { useUserContext } from "contexts/UserContext";
import { useRouter } from "next/router";

// Main Component
export default function Checkout({ checkoutOpen, setCheckoutOpen, setPaymentOpen }) {
  // Setup
  const { cart, cartDispatch } = useCartContext();
  const { user, userDispatch } = useUserContext();
  const router = useRouter();
  if (!user) {
    // console.log("no user at checkout");
    router.push({
      pathname: "/login",
      query: { returnUrl: "/store?step=checkout" },
    });
    return;
  }
  let cartTotal = 0;
  let totalItems = 0;
  let shipping = 0;
  //TODO: deal with the cart returning no items.  Possible problem card?
  cart.map((item) => (cartTotal += item.price * item.qty));
  cart.map((item) => (totalItems += item.qty));
  shipping = (0.08 * cartTotal).toFixed(2);
  let total = (1.08 * cartTotal).toFixed(2);

  // Handlers
  const completeOrder = async (data) => {
    const orderDetails = {
      url: process.env.NEXT_PUBLIC_clientordersapi,
      name: user.user,
      cartTotal: total.toString(),
      totalItems,
      status: "new",
    };

    const response = await commitOrder(orderDetails);
    router.push(`/myaccount?ordercomplete=${response.id}`);
    cartDispatch({ type: "CLEAR_CART" });
  };
  async function commitOrder(details) {
    const params = {
      status: "new",
      cartTotal: details.cartTotal,
      totalItems: details.totalItems,
      Name: details.name,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(details.url, options);
    const data = await response.json();
    return data;
  }

  // Return
  return (
    <Transition.Root show={checkoutOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setCheckoutOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Checkout</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCheckoutOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <HomeModernIcon className="mb-2 w-8 text-gray-400" />

                        <label className="ml-2 text">Ship to this address:</label>

                        <div className="my-1 border-t border-gray-400"></div>
                        <div className="flex">
                          <div>
                            <input
                              defaultChecked
                              id="default-radio-1"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="w-4 h-4 text-azure-600 bg-gray-100 border-gray-300 "
                            />
                          </div>
                          <div className="ml-2 mt-px">
                            <p>{user.defaultAddress.address1}</p>
                            <p>{user.defaultAddress.address2}</p>
                            <p>
                              {user.defaultAddress.city +
                                ", " +
                                user.defaultAddress.state +
                                " " +
                                user.defaultAddress.zip}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <div>
                            <input
                              id="default-radio-1"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="w-4 h-4 text-azure-600 bg-gray-100 border-gray-300   "
                            />
                          </div>
                          <div className="ml-2 mt-px text-gray-400 mb-4">
                            <p>new address</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6 px-4 sm:px-6">
                        <div className="mt-8 flex justify-between text-base font-medium text-gray-900">
                          <p>Sub-Total</p>
                          <p>${cartTotal}.00</p>
                        </div>
                      </div>
                      <div className=" px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Shipping</p>
                          <p>${shipping}</p>
                        </div>
                      </div>
                      <div className=" px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p className="font-bold">${total}</p>
                        </div>
                      </div>
                      <div className="mt-8">
                        <CreditCardIcon className="mb-2 w-8 text-gray-400" />

                        <label className="ml-2 text">Payment Method</label>

                        <div className="my-1 border-t border-gray-400"></div>
                        <div className="flex">
                          <div>
                            <input
                              defaultChecked
                              id="default-radio-1"
                              type="radio"
                              value=""
                              name="cc"
                              className="w-4 h-4 text-azure-600 bg-gray-100 border-gray-300 "
                            />
                          </div>

                          <div className="ml-2 mt-px">
                            <span className=" font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ae67fa] to-[#f49867]">
                              DynaCard
                            </span>
                            <p>
                              <span className="text-xs">Credit Card Number:</span>
                              {user.dynacard.ccnum}
                            </p>

                            <p>
                              <span className="text-xs">Expiration:</span>
                              {user.dynacard.expiration}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          <div>
                            <input
                              id="default-radio-1"
                              type="radio"
                              value=""
                              name="cc"
                              className="w-4 h-4 text-azure-600 bg-gray-100 border-gray-300   "
                            />
                          </div>
                          <div className="ml-2 mt-px text-gray-400">
                            <p>new payment method</p>
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          completeOrder();
                        }}
                        className="cursor-pointer mt-6 flex items-center justify-center rounded-md border border-transparent bg-azure-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-azure-700"
                      >
                        Complete Order
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
