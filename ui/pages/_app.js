import { CartProvider } from "contexts/CartContext";
import { UserProvider } from "contexts/UserContext";
import { RouteGuard } from "components/RouteGuard";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "components/globals.css";
import toast, { Toaster } from "react-hot-toast";

function Loading() {
  var router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    loading && (
      <div className="absolute h-full w-full flex justify-center items-center top-0 left-0 bg-white z-40">
        <div className="absolute l-1/2 t-1/2 h-24 w-24 border-4"></div>
      </div>
    )
  );
}
export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Toaster />
      <CartProvider>
        <RouteGuard>
          <Loading />
          <Component {...pageProps} />
        </RouteGuard>
      </CartProvider>
    </UserProvider>
  );
}
