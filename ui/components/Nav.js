import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon, WrenchIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";

import { useUserContext } from "contexts/UserContext";
import { useCartContext } from "contexts/CartContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Banking", href: "/banking" },
  { name: "Insurance", href: "/insurance", new: true },
  { name: "Store", href: "/store" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const router = useRouter();

  const handleLogout = () => {
    router.push({
      pathname: "/logout",
    });
  };
  const { user } = useUserContext();

  // console.log(router.pathname)
  return (
    <Disclosure as="nav" className="bg-azure-800 sticky w-full z-20 top-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-white">
                <div className="flex flex-shrink-0 items-center">
                  <img className="block h-8 w-auto lg:hidden" src="/images/wow.png" alt="SuchCodeWow" />
                  <img className="hidden h-8 w-auto lg:block" src="/images/wow.png" alt="SuchCodeWow" />
                </div>
                <div className="hidden sm:ml-6 sm:block ">
                  <div className=" flex space-x-4">
                    {navigation.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => router.push(item.href)}
                        className={classNames(
                          item.href == router.pathname ? " bg-azure-600" : " hover:bg-azure-700",
                          "px-3 py-2 rounded-md font-bold cursor-pointer relative"
                        )}
                      >
                        {item.new && (
                          <div className="absolute -top-1  right-2 inline-flex items-center justify-center ml-1 w-10 h-4 text-xs  text-white bg-lime_green-300 border-2 border-white rounded-full  dark:border-gray-900">
                            new
                          </div>
                        )}
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                <button
                  type="button"
                  className="hidden md:inline rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                {user.user ? (
                  <Menu as="div" className="relative ml-3 z-25">
                    <div>
                      <Menu.Button className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-3 py-2 rounded-md cursor-pointer flex  text-sm  focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {user.user}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/myaccount"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Account
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={handleLogout}
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/administration"
                              className={classNames(active ? "bg-gray-100" : "", "px-4 py-2  text-gray-700 flex")}
                            >
                              <KeyIcon className="w-6 inline text-crimson-500 mr-2" />
                              Administration
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/operations"
                              className={classNames(active ? "bg-gray-100" : "", "px-4 py-2  text-gray-700 flex")}
                            >
                              <WrenchIcon className="w-6 inline text-crimson-500 mr-2" />
                              Operations
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <a
                    href="/login"
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-3 py-2 rounded-md cursor-pointer"
                  >
                    Sign In
                  </a>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href == router.pathname
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
