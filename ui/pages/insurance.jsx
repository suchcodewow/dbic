import Nav from "components/Nav";
import {
  BoltIcon,
  ChatBubbleBottomCenterTextIcon,
  GlobeAltIcon,
  ScaleIcon,
  HomeIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

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
  return (
    <div>
      <Nav />
      <div className="bg-white  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="pt-8 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Insurance that fits like a glove
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Protecting what matters to you shouldn't be a hassle. Find the
            coverage you need and get the peace of mind you deserve.
          </p>
        </div>
        <div className="mt-10">
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
          <div className="py-10">CTA</div>
        </div>
      </div>
    </div>
  );
}
