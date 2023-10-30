import { useState } from "react";
import Nav from "components/Nav";
import { useForm, Controller } from "react-hook-form";
import { useUserContext } from "contexts/UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Footer from "components/footer";
import { customItems } from "components/Library";
import { Listbox, Transition } from "@headlessui/react";

const customItem = customItems[Math.floor(Math.random() * customItems.length)];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Quote() {
  const { user, userDispatch } = useUserContext();

  const router = useRouter();
  const allQuestions = [
    {
      type: "text",
      label: "Your Name",
      value: "Name",
      default: user.user,
      rules: { minlength: 50 },
    },
    {
      type: "text",
      label: "Email Address",
      value: "Email",
      default: user.user ? user.user + "@dynabankinsuracart.com" : "",
      rules: [{ required: true, minlength: 50 }],
    },
    {
      type: "text",
      label: "Item Name",
      value: "ItemName",
      default: customItem.name,
      rules: [{ required: true, minlength: 50 }],
    },
    {
      type: "text",
      label: "Item Description",
      value: "ItemDesc",
      default: customItem.description,
      rules: [{ required: true, minlength: 50 }],
    },
    { type: "text", label: "Declared Value ($USD)", value: "itemValue", default: randomNumber(10, 10000).toString() },
    {
      type: "text",
      label: "Year created",
      value: "CreateYear",
      default: randomNumber(700, 2023).toString(),
    },
    {
      type: "dropdown",
      label: "Which type of insurane are you most interested in?",
      value: "InsuranceType",
      options: insuranceTypes,
    },
    { type: "dropdown", label: "Previous Insurer", value: "PreviousInsurer", options: insurers },
  ];
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  async function onSubmit(data) {
    console.log(data);
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return (
    <div className="bg-gray-200  min-h-screen flex flex-col w-screen items-center">
      <Nav />
      <div className="bg-white my-10 mx-10 rounded-md shadow-md w-1/2 max-w-xl flex flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto py-10 px-8">
          {allQuestions.map((question) => {
            switch (question.type) {
              case "text": {
                // text
                return (
                  <div key={question.value} className="my-6 relative">
                    <input
                      {...register(question.value, question.rules)}
                      type="text"
                      name={question.value}
                      defaultValue={question.default}
                      id={question.value}
                      key={question.value}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      {question.label}
                    </label>
                  </div>
                );
              }
              case "dropdown": {
                console.log(question.options[0].name);
                return (
                  <div key={question.value} className="my-6 relative">
                    <Controller
                      control={control}
                      // defaultValue=""
                      name={question.value}
                      // defaultValue={question.options[0].name}
                      render={({ field }) => (
                        <Listbox>
                          {({ open }) => (
                            <>
                              <Listbox.Label className=" text-gray-500 text-xs ">{question.label}</Listbox.Label>
                              <div className="">
                                <span className="relative w-full rounded-md shadow-sm">
                                  <Listbox.Button
                                    {...field}
                                    className="cursor-hand relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                                  >
                                    <span>{value}</span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <svg
                                        className="h-5 w-5 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                      >
                                        <path
                                          d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </span>
                                  </Listbox.Button>
                                </span>
                                <Transition
                                  show={open}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                  className="mt-1 w-full rounded-md bg-white shadow-lg"
                                >
                                  <Listbox.Options
                                    static
                                    className="bg-white absolute z-10 cursor-pointer max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 border-1 drop-shadow-lg"
                                  >
                                    {question.options.map((item) => (
                                      <Listbox.Option key={item.name} value={item.name}>
                                        {({ selected, active }) => (
                                          <div
                                            className={`${
                                              active ? "text-white bg-blue-600" : "text-gray-900"
                                            }  select-none relative py-2 pl-8 pr-4`}
                                          >
                                            <span
                                              className={`${selected ? "font-semibold" : "font-normal"} block text-sm`}
                                            >
                                              {item.name}
                                            </span>
                                            {item.tagline && <span>{item.tagline}</span>}
                                            {selected && (
                                              <span
                                                className={`${
                                                  active ? "text-white" : "text-blue-600"
                                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                              >
                                                <svg
                                                  className="h-5 w-5"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 20 20"
                                                  fill="currentColor"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      )}
                    />
                  </div>
                );
              }
              default: {
                return <p className="text-red-500 font-bold">!! Invalid question type: '{question.type}' !!</p>;
              }
            }
          })}
          <div className="relative flex flex-row justify-between">
            <button
              disabled={!isValid}
              type="submit"
              className="text-white bg-orange-400 hover:bg-orange-300 disabled:bg-gray-400 disabled:hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit Quote
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

const insurers = [
  { index: 1, name: "Not previously insured.", tagline: "" },
  { index: 2, name: "Skeleton Securities", tagline: "we'll even insure the ones in your closet" },
  { index: 3, name: "Route 666", tagline: "The end of the road for your insurance problems" },
  { index: 4, name: "Friends on the Other Side", tagline: "Let's make a deal- we hope you're satisfied" },
  { index: 5, name: "Infinity Eye", tagline: "We're watching your most valuable possessions.  And also you." },
  { index: 6, name: "Abyssal Assurance", tagline: "Literally endless resources to protect you." },
  {
    index: 7,
    name: "My Purple Cousin Herbert",
    tagline:
      "We found a child that accepted candy as payment to develop our brand name so we could pass the savings on to you!",
  },
];

const insuranceTypes = [
  { index: 1, name: "Burglary or Theft" },
  { index: 2, name: "Water or Fire Damage" },
  { index: 4, name: "Object becomes self-aware or develops aspirations of world domination" },
];
const Questions = (props) => {
  const { question, register, control } = props;
  switch (question.type) {
    case "text": {
      // text
      return (
        <>
          <input
            {...register(question.value, question.rules)}
            type="text"
            name={question.value}
            defaultValue={question.default}
            id={question.value}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            {question.label}
          </label>
        </>
      );
    }
    case "dropdown": {
      // console.log(question);
      // const [itemValue, setItemValue] = useState(question.options[0].name);
      return (
        <Controller
          control={control}
          // defaultValue=""
          name={question.value}
          defaultValue={question.options[0].name}
          render={({ onChange, value }) => (
            <Listbox onChange={onChange} value={value}>
              {({ open }) => (
                <>
                  <Listbox.Label className=" text-gray-500 text-xs ">{question.label}</Listbox.Label>
                  <div className="">
                    <span className="relative w-full rounded-md shadow-sm">
                      <Listbox.Button className="cursor-hand relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        <span>{value}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                            <path
                              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Listbox.Button>
                    </span>
                    <Transition
                      show={open}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="mt-1 w-full rounded-md bg-white shadow-lg"
                    >
                      <Listbox.Options
                        static
                        className="bg-white absolute z-10 cursor-pointer max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 border-1 drop-shadow-lg"
                      >
                        {question.options.map((item) => (
                          <Listbox.Option key={item.name} value={item.name}>
                            {({ selected, active }) => (
                              <div
                                className={`${
                                  active ? "text-white bg-blue-600" : "text-gray-900"
                                }  select-none relative py-2 pl-8 pr-4`}
                              >
                                <span className={`${selected ? "font-semibold" : "font-normal"} block text-sm`}>
                                  {item.name}
                                </span>
                                {item.tagline && <span>{item.tagline}</span>}
                                {selected && (
                                  <span
                                    className={`${
                                      active ? "text-white" : "text-blue-600"
                                    } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          )}
        />
      );
    }
    default: {
      return <p className="text-red-500 font-bold">!! Invalid question type: '{question.type}' !!</p>;
    }
  }
};
