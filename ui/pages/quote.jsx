import { useState } from "react";
import Nav from "components/Nav";
import { useForm } from "react-hook-form";
import { useUserContext } from "contexts/UserContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Quote() {
  const { user, userDispatch } = useUserContext();
  const router = useRouter();
  const questionBlocks = [
    [
      {
        label: "Your Name",
        value: "Name",
        default: user.user,
        rules: { minlength: 50 },
      },
      {
        label: "Email Address",
        value: "Email",
        default: user.user ? user.user + "@dynabankinsuracart.com" : "",
        rules: [{ required: true, minlength: 50 }],
      },
    ],
    [
      { label: "Your Birthday", value: "BirthDate", default: "4/3/1995" },
      {
        label: "Your home's size in square feet",
        value: "homeSize",
        default: "1600",
      },
    ],
    [
      { label: "Car's model", value: "CarModel", default: "Generat Boxer" },
      {
        label: "Car's manufacturer year",
        value: "CarYear",
        default: "2016",
      },
    ],
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  async function onSubmit(data) {
    // console.log(data);
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apicall = await fetch(process.env.NEXT_PUBLIC_clientquotesapi, options);
    const response = await apicall.json();
    // console.log(response);
    if (response.message == "success") {
      // Quote went through
      toast.success("Submitted Quote");
      router.push("/myaccount");
    } else {
      toast.error("Sorry, your quote failed to process [E-INS1]");
    }
    // return response;
  }
  const [formStep, setFormStep] = useState(1);
  const nextStep = () => {
    setFormStep((current) => current + 1);
  };
  const previousStep = () => {
    setFormStep((current) => current - 1);
  };

  return (
    <div className="bg-gray-200 pb-48 min-h-screen flex flex-col w-screen ">
      <Nav />
      <div className="bg-white mt-10 mx-auto max-w-4xl rounded-md shadow-md w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 mx-auto py-10">
          {questionBlocks.map(
            (questions, idx) =>
              // Only add fields if the form has reached them
              formStep >= idx + 1 && (
                <div key={idx} className={formStep === idx + 1 ? "block" : "hidden"}>
                  <p>
                    Step {idx + 1} of {questionBlocks.length}
                  </p>
                  {questions.map((question, idx) => (
                    // {
                    //   console.log(question);
                    // }
                    <div key={idx} className="relative z-0 my-6 w-full group">
                      <input
                        {...register(question.value, question.rules)}
                        type="text"
                        name={question.value}
                        defaultValue={question.default}
                        id={question.value}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        {question.label}
                      </label>
                    </div>
                  ))}
                </div>
              )
          )}

          <div className="flex flex-row justify-between">
            {formStep === 1 && <div></div>}
            {formStep > 1 && (
              <button
                disabled={!isValid}
                onClick={previousStep}
                type="button"
                className="text-white bg-azure-500 hover:bg-azure-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 "
              >
                Back
              </button>
            )}
            {formStep === questionBlocks.length && (
              <button
                disabled={!isValid}
                type="submit"
                className="text-white bg-orange-400 hover:bg-orange-300 disabled:bg-gray-400 disabled:hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Submit Quote
              </button>
            )}
            {formStep < questionBlocks.length && (
              <button
                disabled={!isValid}
                onClick={nextStep}
                type="button"
                className="text-white bg-azure-500 hover:bg-azure-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
