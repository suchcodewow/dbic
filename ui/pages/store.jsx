import { useState } from "react";
import StoreAll from "components/StoreAll";
import { useCartContext } from "contexts/CartContext";
import Nav from "components/Nav";
import Cart from "components/Cart";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Dynacard from "components/Dynacard";
import Checkout from "components/Checkout";
import { userAgent } from "next/server";
import { useUserContext } from "contexts/UserContext";
import Footer from "components/footer";

export default function Store({ _catalog, _carousel }) {
  // Panels
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  // data
  const [catalog, setCatalog] = useState(_catalog);
  const { cart, cartDispatch } = useCartContext();
  const { user } = useUserContext();
  var cartTotal = 0;
  if (cart) {
    cart.map((item) => (cartTotal += item.qty));
  }

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Nav />
      <div className="bg-white w-full z-10 top-0">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-end">
            {cartTotal > 0 && (
              <div
                onClick={() => {
                  setCartOpen(true);
                }}
                className="cursor-pointer bg-azure-300  hover:bg-azure-400 flex rounded-lg px-5 py-2 w-auto"
              >
                <span className=" font-bold text-white mr-1">{cartTotal}</span>
                <ShoppingBagIcon className="text-white w-6" />
                <span className="font-bold text-white ml-1">View Cart</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dynacard />
      <StoreAll catalog={catalog} />
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} setCheckoutOpen={setCheckoutOpen} />
      {user?.user && (
        <Checkout checkoutOpen={checkoutOpen} setCheckoutOpen={setCheckoutOpen} setPaymentOpen={setPaymentOpen} />
      )}
      <Footer />
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
export const getServerSideProps = async () => {
  var response;
  try {
    response = await fetch(process.env.catalogapi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // console.log("Error connecting to the database!", error);
    return { props: {} };
  }
  const data = await response.json();
  const carouselData = [...data];
  shuffle(carouselData);
  const shortCarousel = carouselData.slice(0, 24);

  return {
    props: {
      _catalog: data,
      _carousel: shortCarousel,
    },
  };
};
