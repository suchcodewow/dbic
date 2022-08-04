import { React, useState, useEffect } from "react";
const { publicRuntimeConfig } = require("next.config");
import { NavBar } from "components";

export default function Store() {
  const BASE_URL = publicRuntimeConfig.apiCatalog;
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    var localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      setCartItems(localCart);
    }
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const catalog = await response.json();
        setCatalog(catalog);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
}
