import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartContext } from "contexts/CartContext";

export default function Cart({ cartOpen, setCartOpen, setCheckoutOpen }) {
  const { cart, cartDispatch } = useCartContext();
  let cartTotal = 0;
  let totalItems = 0;
  //TODO: deal with the cart returning no items.  Possible problem card?
  cart.map((item) => (cartTotal += item.price * item.qty));
  cart.map((item) => (totalItems += item.qty));

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={setCartOpen}>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900">My Bag</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setCartOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                                  <img
                                    src={`/images/store/${item.img}`}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900 h-12 overflow-hidden">
                                      <h3>
                                        <a href={item.href}>{item.shortDesc}</a>
                                      </h3>
                                      <p className="ml-4">${item.price * item.qty}.00</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex gap-3 items-center">
                                      <p
                                        onClick={() =>
                                          cartDispatch({
                                            type: "SUBTRACT_ITEM",
                                            item,
                                          })
                                        }
                                        className="text-gray-500 text-xl font-bold cursor-pointer"
                                      >
                                        -
                                      </p>
                                      <p className="text-gray-500">Qty {item.qty}</p>
                                      <p
                                        onClick={() =>
                                          cartDispatch({
                                            type: "ADD_ITEM",
                                            item,
                                          })
                                        }
                                        className="text-gray-500 text-xl font-bold cursor-pointer"
                                      >
                                        +
                                      </p>
                                    </div>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          cartDispatch({
                                            type: "REMOVE_ITEM",
                                            item,
                                          })
                                        }
                                        className="font-medium text-azure-600 hover:text-azure-700"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${cartTotal}.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div
                        onClick={() => {
                          setCartOpen(false);
                          setCheckoutOpen(true);
                        }}
                        className="cursor-pointer mt-6 flex items-center justify-center rounded-md border border-transparent bg-azure-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-azure-700"
                      >
                        Checkout
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                            onClick={() => setCartOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
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
