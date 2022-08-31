import { Carousel, StoreFeature } from "components";
import { NavBar } from "components";
import { useEffect, useState } from "react";
import { DefaultArea } from "styles/Common";
import styled from "styled-components";

export default function Store({ _catalog, _carousel }) {
  const [cartItems, setCartItems] = useState([]);
  const [catalog, setCatalog] = useState(_catalog);
  const [carousel, setCarousel] = useState(_carousel);
  useEffect(() => {
    const fetchData = async () => {
      var response;
      try {
        response = await fetch(process.env.NEXT_PUBLIC_clientcatalogapi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log("Error connecting to the database!", error);
        return { props: {} };
      }
      const data = await response.json();
      const carouselData = [...data];
      shuffle(carouselData);
      const shortCarousel = carouselData.slice(0, 12);
      // setCatalog(data);
      // setCarousel(shortCarousel);
    };
    fetchData();
  }, []);
  return (
    <div>
      <NavBar cartItems={cartItems} />
      <DefaultArea>
        <StoreHeading>
          <h1>Welcome to the ultimate shopping experience!</h1>
        </StoreHeading>
        {catalog && <Carousel catalog={carousel} />}
        {catalog ? (
          <StoreFeature catalog={catalog} />
        ) : (
          <h3 style={{ color: "white" }}>
            THE STORE DIDN'T LOAD. *TERRY JEFFERS* WWWWWWHHHHYYY?
          </h3>
        )}
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
    console.log("Error connecting to the database!", error);
    return { props: {} };
  }
  const data = await response.json();
  const carouselData = [...data];
  shuffle(carouselData);
  const shortCarousel = carouselData.slice(0, 12);

  return {
    props: {
      _catalog: data,
      _carousel: shortCarousel,
    },
  };
};
