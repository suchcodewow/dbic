import { CartProvider } from "contexts/CartContext";
import { UserProvider } from "contexts/UserContext";
import { RouteGuard } from "components/RouteGuard";

import "components/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <CartProvider>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </CartProvider>
    </UserProvider>
  );
}
