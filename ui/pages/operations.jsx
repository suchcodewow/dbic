import { WrenchIcon } from "@heroicons/react/24/outline";
import Nav from "components/Nav";

export default function Operations() {
  return (
    <div className="bg-gray-100">
      <Nav />
      <div className="flex p-4 py-2">
        <WrenchIcon className="w-8 " />
        <h1 className=" text-4xl font-bold ml-2">Operations</h1>
      </div>
    </div>
  );
}
