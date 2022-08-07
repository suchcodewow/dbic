import { Carousel, StoreFeature } from "components";
import { NavBar } from "components";
import { useEffect, useMemo, useState } from "react";
const { publicRuntimeConfig } = require("next.config");
import { DefaultArea } from "styles/Common";
import styled from "styled-components";

export default function Store(catalog) {
  // const BASE_URL = publicRuntimeConfig.apiCatalog;
  // const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    // Check for existing  cart
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      setCartItems(localCart);
    }
  }, []);

  return (
    <div>
      <NavBar />
      <StoreHeading>
        <h1>Welcome to the ultimate shopping experience!</h1>
      </StoreHeading>
      <Carousel catalog={catalog.catalog} />
      <StoreFeature catalog={catalog} />
    </div>
  );
}
const StoreHeading = styled.div`
  width: 100%;
  text-align: center;
  max-width: 1400px;
  width: 80%;

  margin-bottom: 5rem;
  h1 {
    font-size: 52px;
    line-height: 75px;
    font-weight: 800;
    background: linear-gradient(89.97deg, #ae67fa 1.84%, #f49867 102.67%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const getStaticProps = async () => {
  const BASE_URL = publicRuntimeConfig.apiCatalog;
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return {
    props: {
      catalog: data,
    },
  };
};
