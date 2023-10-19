import StoreQuickView from "./StoreQuickView";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

export default function StoreAll({ catalog }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [quickView, setQuickView] = useState(false);
  const [item, setItem] = useState([]);
  function showItem(product) {
    setItem(product);
    setQuickView(true);
  }
  return (
    <div className="bg-white py-6">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Best Sellers in Fashion and Tech...</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {catalog?.map((product) => (
            <div
              key={product.id}
              className="group relative cursor-pointer"
              onClick={() => {
                showItem(product);
              }}
            >
              <div className="min-h-80">
                <img className="scale-100 hover:scale-75 ease-in duration-500" src={`/images/store/${product.img}`} />
              </div>
              <div className="mt-4 flex justify-between items-center ">
                {/* Reviews */}
                <div>
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating ? "text-yellow-700" : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{item.rating} out of 5 stars</p>
                  </div>
                </div>
                <p className="text-2xl text-gray-900">${product.price}</p>
              </div>
              <div className="h-12 overflow-hidden">
                <h3 className=" text-gray-700">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.shortDesc}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <StoreQuickView quickView={quickView} setQuickView={setQuickView} item={item} />
      </div>
    </div>
  );
}
