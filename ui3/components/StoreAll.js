import StoreQuickView from "./StoreQuickView";
import { useState } from "react";

export default function StoreAll({ catalog }) {
  const [quickView, setQuickView] = useState(false);
  const [item, setItem] = useState([]);
  function showItem(product) {
    setItem(product);
    setQuickView(true);
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Here is some stuffs!
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {catalog?.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onClick={(product) => {
                showItem(product);
              }}
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={`/images/store/${product.img}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className=" text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.shortDesc}
                  </h3>
                </div>
                <p className="text-2xl text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <StoreQuickView
          quickView={quickView}
          setQuickView={setQuickView}
          item={item}
        />
      </div>
    </div>
  );
}
