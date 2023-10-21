import Nav from "components/Nav";
import Hero from "components/Hero";
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  ScaleIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Footer from "components/footer";
const features = [
  {
    name: "Comprehensive Home Coverage",
    description: "Homeowners insurance protects you from fires, lightning, wind, thefts and vandalism.",
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
    description: "You'll be whole again fast with the fastest claim service on the planet.  ",
    icon: BoltIcon,
  },
];
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <div className="my-1" />
      <div className="bg-white mx-auto pt-48  bg-[length:500px] bg-top bg-no-repeat bg-[url('/images/vehicle.svg')]">
        <div className="lg:text-center bg-white">
          <p className="pt-4 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Insurance that fits like a glove
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Protecting what matters to you shouldn't be a hassle. Find the coverage you need and get the peace of mind
            you deserve.
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
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
          <div className="py-12 h-48 my-12 flex justify-center">
            {/* image */}
            <div className="w-64 relative">
              <Image
                src="/images/neighborhood.svg"
                alt="neighboorhood"
                width="500"
                height="100"
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
        <Footer />
      </div>
    </>
  );
}
