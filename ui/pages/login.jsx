import Nav from "components/Nav";
import { useState, useEffect } from "react";
import { useUserContext } from "contexts/UserContext";
import { Prefix, Name, getUser } from "components/Library";
import { useRouter } from "next/router";
import Footer from "components/footer";

const selectedPrefix = Prefix[Math.floor(Math.random() * Prefix.length)];
const selectedName = Name[Math.floor(Math.random() * Name.length)];
const randomId =
  selectedPrefix.charAt(0).toUpperCase() +
  selectedPrefix.slice(1) +
  selectedName.charAt(0).toUpperCase() +
  selectedName.slice(1);

export default function Login() {
  const router = useRouter();
  const { userDispatch } = useUserContext();
  const [userId, setUserId] = useState(randomId);
  const handleLogin = async (e) => {
    e.preventDefault();
    const userObject = await getUser(userId);
    userDispatch({ type: "LOGIN", value: userObject });
    const returnUrl = router.query.returnUrl || "/";
    router.push(returnUrl);
  };

  return (
    <div className=" min-h-screen flex flex-col w-screen">
      <Nav />
      <div className="mt-10 flex flex-1">
        <div className="items-center mx-auto pt-6 max-w-7xl w-full">
          <div className="items-center w-full max-w-xl mx-auto">
            <form onSubmit={handleLogin}>
              <div className="shadow mx-auto sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6 rounded-md">
                  <div className="text-2xl font-bold text-azure-500">Login</div>
                  <div className="grid grid-cols-6 gap-6 mt-4">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        User Name
                      </label>
                      <input
                        type="text"
                        name="userId"
                        id="userId"
                        autoComplete="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        disabled
                        placeholder="(autosaved)"
                        type="text"
                        name="Password"
                        id="Password"
                        autoComplete="Password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className=" px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
