import Nav from "components/Nav";
import { CreditCardIcon, InboxIcon } from "@heroicons/react/24/outline";

export default function Banking() {
  return (
    <div>
      <Nav />
      {/* SideBar */}
      <div className="mx-auto h-fit max-w-7xl px-2 sm:px-6 lg:px-8 flex">
        <aside className="pl-4 py-4 w-1/3 sticky" aria-label="Sidebar">
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
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Unread Messages
                  </span>
                  <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium  bg-azure-600 shadow-md rounded-full ">
                    0
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </aside>
        <div className="mx-auto bg-white border  rounded-md m-4 w-full ml-5 p-5">
          <div className="mb-4 font-bold text-xl">Recent Activity</div>
          <div className="mb-4 font-bold text-xl">My Accounts</div>
          {/* orders table */}
          <div className="overflow-x-auto relative shadow-sm sm:rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
