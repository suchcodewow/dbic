import Nav from "components/Nav";
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  ScaleIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

const features = [
  {
    name: "Comprehensive Home Coverage",
    description:
      "Homeowners insurance protects you from fires, lightning, wind, thefts and vandalism.",
    icon: HomeIcon,
  },
  {
    name: '"No-surprise guarantee"',
    description:
      "You'll pay nothing beyond your agreed on deductible if your vehicle is involved in an accident- guaranteed.",
    icon: KeyIcon,
  },
  {
    name: "Fast Claim Response",
    description:
      "You'll be whole again fast with the fastest claim service on the planet.  ",
    icon: BoltIcon,
  },
];

export default function Insurance() {
  // const { newquoteOpen, setNewquoteOpen } = useState(false);
  return (
    <div>
      <Nav />
      <div className="bg-white  mx-auto pt-48 max-w-7xl  bg-[length:500px] bg-top bg-no-repeat bg-[url('/images/vehicle.svg')]">
        {/* <div className="w-64 h-64 relative mx-auto ">
          <Image src="/images/vehicle.svg" layout="fill" className="" />
        </div> */}
        <div className="lg:text-center bg-white">
          <p className="pt-4 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Insurance that fits like a glove
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Protecting what matters to you shouldn't be a hassle. Find the
            coverage you need and get the peace of mind you deserve.
          </p>
        </div>
        <div className="mt-10 px-4 sm:px-6 lg:px-8">
          <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-14  md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
          <div className="py-12 h-48 my-12 flex justify-center">
            {/* image */}
            <div className="w-64 relative">
              <Image
                src="/images/neighborhood.svg"
                layout="fill"
                className="object-scale-down"
              />
            </div>
            {/* CTA */}
            <div className="ml-6 text-lg">
              <p>You're minutes away from coverage!</p>
              <div className="">
                <div className="flex space-x-4 my-4">
                  <a
                    href="/quote"
                    className="bg-lime_green-300 hover:bg-lime_green-400 shadow-md py-2 px-8 text-xl text-white rounded-full"
                  >
                    Let's go!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 sm:px-24 md:px-48 py-8 bg-gray-100 text-center text-azure-500 text-6xl">
          Personalized Coverage
          <div className="flex w-full justify-center text-left text-gray-900 mt-8 text-xl gap-14">
            <div className="w-96">
              <ul>
                <li className="font-bold">
                  Required Coverages
                  <p className="text-base font-normal mb-7 mt-4">
                    Policies pay for damages or injuries when you are at fault
                    and is required by law.
                  </p>
                </li>
                <li className="font-bold">
                  Additional Options
                  <p className="text-base font-normal mb-7 mt-4">
                    Although not always required these provide you with an extra
                    layer of protection.
                  </p>
                </li>
                <li className="font-bold">
                  We can help!
                  <p className="text-base font-normal mb-7 mt-4">
                    Getting the insurance you need can be daunting. We're here
                    to help!
                  </p>
                </li>
              </ul>
              <div className="flex space-x-4 my-4">
                <a
                  href="/quote"
                  className="bg-lime_green-300 hover:bg-lime_green-400 shadow-md py-2 px-8 text-xl text-white rounded-full"
                >
                  Get covered
                </a>
              </div>
            </div>
            <div>
              <div className="w-64 h-64 relative mx-auto ">
                <Image src="/images/choices.svg" layout="fill" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
