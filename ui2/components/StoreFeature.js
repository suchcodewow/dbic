import { useEffect, useState } from "react";
import styled from "styled-components";
import { DefaultArea } from "styles/Common";

const { publicRuntimeConfig } = require("next.config");

export default function StoreFeature() {
  const BASE_URL = publicRuntimeConfig.apiCatalog;
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(null);
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
    <DefaultArea>
      <StoreHeading>
        <h1>Welcome to the ultimate shopping experience!</h1>
      </StoreHeading>
      {/* id,category,rating,img,price,shortDesc */}
      <StoreContainer>
        <Allitems>
          {catalog?.map((item) => (
            <ItemContainer key={item.id}>
              <ItemImage>
                <img src={`/images/store/${item.img}`} alt="" />
              </ItemImage>
              <ItemContent>
                <div>
                  <h3>${item.price}</h3>
                  <h4>.00</h4>
                </div>
                <p>{item.shortDesc}</p>
              </ItemContent>
            </ItemContainer>
          ))}
        </Allitems>
      </StoreContainer>
    </DefaultArea>
  );
}

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1rem;
  height: 200px;
  p {
    font-size: 14px;
    font-weight: 700;

    color: #fff;
  }
  h3 {
    font-size: 25px;
    font-weight: 800;
    line-height: 30px;
    color: #fff;
  }
  p:last-child {
    cursor: pointer;
  }
`;

const ItemImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background: #fff;
  left: 0;
  right: 0;
  img {
    position: absolute;
    height: 100%;
    margin: auto;
  }
`;

const ItemContainer = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #031b34;
`;

const Allitems = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
`;

const GroupA = styled.div`
  flex: 0.75;
  margin-right: 2rem;
`;

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

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 80%;
`;
