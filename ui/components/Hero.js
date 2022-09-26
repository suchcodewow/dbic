export default function Hero() {
  return (
    <div className="relative overflow-hidden ">
      <div className="mx-auto ">
        <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
          <svg
            className="absolute inset-y-0 right-0 hidden h-full w-48 translate-x-1/2 transform text-white lg:block"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mx-auto px-4 sm:px-6 lg:px-8 lg:pt-10">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ae67fa] to-[#f49867]">
                  DynaBankInsuraCart
                </span>
                <span className="block text-indigo-600  text-3xl mt-3">
                  Your one stop shop for non-stop shopping!
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                Everything you need with one convenient account! Enjoy our
                full-featured catalog, pay bills or transfer funds, and quickly
                find the right insurance that perfectly fits{" "}
                <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-[#ae67fa] to-[#f49867]">
                  YOUR
                </span>{" "}
                unique needs.
              </p>
              <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                I want to start...
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/store"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-azure-800 px-8 py-3 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                  >
                    Shopping
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/banking"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-azure-700 px-8 py-3 text-base font-medium text-white md:py-4 md:px-10 md:text-lg"
                  >
                    Banking
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="/insurance"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-azure-600 px-8 py-3 text-base font-medium text-white  md:py-4 md:px-10 md:text-lg"
                  >
                    A quote
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0  lg:w-2/3">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="/images/hero.jpg"
          alt=""
        />
      </div>
    </div>
  );
}
