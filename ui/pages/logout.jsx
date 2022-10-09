import { useRouter } from "next/router";
import { useUserContext } from "contexts/UserContext";
import { useCartContext } from "contexts/CartContext";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const { userDispatch } = useUserContext();
  const { cartDispatch } = useCartContext();

  useEffect(() => {
    userDispatch({ type: "LOGOUT" });
    cartDispatch({ type: "CLEAR_CART" });
    router.push("/");
  });
  return <div>go away</div>;
}
