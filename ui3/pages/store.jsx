const defaultEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=4c5f8a1185a3e74355b50ae2d3568910&language=en-US&with_genres=35`;
import { useState } from "react";
import StoreAll from "components/StoreAll";
import Nav from "components/Nav";

export default function Store({ _catalog, _carousel }) {
  // const [cartItems, setCartItems] = useState([]);

  const [catalog, setCatalog] = useState(_catalog);
  // const [carousel, setCarousel] = useState(_carousel);
  return (
    <div>
      <Nav />
      <StoreAll catalog={catalog} />
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
  const shortCarousel = carouselData.slice(0, 24);

  return {
    props: {
      _catalog: data,
      _carousel: shortCarousel,
    },
  };
};
