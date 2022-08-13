import { Carousel, StoreFeature } from "components";
import { NavBar } from "components";
import { useEffect, useMemo, useState } from "react";
const { publicRuntimeConfig } = require("next.config");
import { DefaultArea } from "styles/Common";
import styled from "styled-components";

export default function Store({ catalog, carousel }) {
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

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <NavBar cartItems={cartItems} />
      <DefaultArea>
        {" "}
        <StoreHeading>
          <h1>Welcome to the ultimate shopping experience!</h1>
        </StoreHeading>
        <Carousel cartItems={cartItems} onAdd={onAdd} catalog={carousel} />
        <StoreFeature cartItems={cartItems} onAdd={onAdd} catalog={catalog} />
      </DefaultArea>
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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const getStaticProps = async () => {
  const BASE_URL = publicRuntimeConfig.apiCatalog;
  const response = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const carouselData = [...data];
  shuffle(carouselData);
  const shortCarousel = carouselData.slice(0, 12);

  return {
    props: {
      catalog: data,
      carousel: shortCarousel,
    },
  };
};
