import styled from "styled-components";
import { DefaultArea } from "styles/Common";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useCartContext } from "contexts/CartContext";
import Rating from "react-rating";

export default function StoreFeature({ catalog }) {
  const { cart, cartDispatch } = useCartContext();
  return (
    <DefaultArea>
      <StoreContainer>
        <Allitems>
          {/* id,category,rating,img,price,shortDesc */}
          {catalog.map((item) => (
            <ItemContainer
              key={item.id}
              onClick={() => cartDispatch({ type: "ADD_ITEM", item })}
            >
              <ItemImage>
                <img src={`/images/store/${item.img}`} alt="" />
              </ItemImage>
              <ItemContent>
                <PriceLine>
                  <h3>${item.price}</h3>
                  <sup>.00</sup>
                  &nbsp;&nbsp;
                  <Rating
                    readonly
                    initialRating={item.rating}
                    emptySymbol={<AiOutlineStar color="yellow" />}
                    fullSymbol={<AiFillStar color="yellow" />}
                  />
                </PriceLine>
                <p>{item.shortDesc}</p>
              </ItemContent>
            </ItemContainer>
          ))}
        </Allitems>
      </StoreContainer>
    </DefaultArea>
  );
}

const PriceLine = styled.div`
  width: 100%;
  color: #fff;
  h3 {
    font-size: 25px;
    font-weight: 800;
    line-height: 30px;
    display: inline;
  }
`;
const ItemContent = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;

  height: 200px;
  p {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    margin-top: 1rem;
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
    padding: 5px 5px;
  }
`;

const ItemContainer = styled.div`
  width: 300px;
  height: 400px;

  display: flex;
  flex-direction: column;
  background: #05284d;
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

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 80%;
`;
