import Nav from "components/Nav";
import { useState } from "react";
import { useUserContext } from "contexts/UserContext";
import { Prefix, Name } from "components/Library";
import { useRouter } from "next/router";

export default function Login() {
  const { user, userDispatch, loading, errorMessage } = useUserContext();

  const router = useRouter();
  const selectedPrefix = Prefix[Math.floor(Math.random() * Prefix.length)];
  const selectedName = Name[Math.floor(Math.random() * Name.length)];
  const randomId =
    selectedPrefix.charAt(0).toUpperCase() +
    selectedPrefix.slice(1) +
    selectedName.charAt(0).toUpperCase() +
    selectedName.slice(1);
  const [userId, setUserId] = useState(randomId);
  const handleLogin = (e) => {
    e.preventDefault();
    userDispatch({ type: "LOGIN", userId });
    router.back();
  };

  return (
    <div>
      <Nav />
      <div className="mt-10">
        <div className="items-center">
          <div className="items-center w-full sm:w-1/2 mx-auto">
            <form onSubmit={handleLogin}>
              <div className="shadow mx-autosm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6 ">
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
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
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
