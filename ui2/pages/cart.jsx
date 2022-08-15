import { Carousel, NavBar } from "components";
import styled from "styled-components";
import { useCartContext } from "contexts/CartContext";
import { RiAddFill, RiSubtractFill, RiDeleteBin2Line } from "react-icons/ri";
import Dynacard from "components/Dynacard";

export default function Cart() {
  const { cart, cartDispatch } = useCartContext();
  return (
    <div>
      <NavBar />
      <Dynacard />
      <CartArea>
        <CartDetails>
          <h1>Shopping Cart</h1>
          <ItemRow>
            <ItemPicture>PRODUCT</ItemPicture>
            <ItemHeader>PRICE</ItemHeader>
            <ItemHeader>QUANTITY</ItemHeader>
            <ItemHeader>TOTAL</ItemHeader>
          </ItemRow>
          {cart?.map((item) => (
            <CartItem key={item.id}>
              <ItemRow>
                <RiDeleteBin2Line
                  style={{ cursor: "pointer" }}
                  size={24}
                  color="green"
                  onClick={() => cartDispatch({ type: "REMOVE_ITEM", item })}
                />
                <ItemPicture>
                  <img src={`/images/store/${item.img}`} alt="" />
                  <h4>{item.shortDesc}</h4>
                </ItemPicture>
                <ItemText>
                  <h4>${item.price}</h4>
                  <h6>.00</h6>
                </ItemText>
                <ItemText>
                  <RiSubtractFill
                    style={{ cursor: "pointer" }}
                    size={24}
                    color="red"
                    onClick={() =>
                      cartDispatch({ type: "SUBTRACT_ITEM", item })
                    }
                  />
                  <p>{item.qty}</p>
                  <RiAddFill
                    style={{ cursor: "pointer" }}
                    size={24}
                    color="green"
                    onClick={() => cartDispatch({ type: "ADD_ITEM", item })}
                  />
                </ItemText>
                <ItemText>
                  <h4>${item.price * item.qty}</h4>
                  <h6>.00</h6>
                </ItemText>
              </ItemRow>
            </CartItem>
          ))}
        </CartDetails>
        <Checkout>
          <CheckoutHeader>
            <h1>Checkout</h1>
          </CheckoutHeader>
          <CheckoutTotal>Sub-Total: </CheckoutTotal>
        </Checkout>
      </CartArea>
    </div>
  );
}
const CheckoutTotal = styled.div`
  width: 100%;
  text-align: center;
`;
const CheckoutHeader = styled.div`
  width: 100%;
  text-align: center;
  h1 {
    margin: auto;
    font-size: 38px;
    line-height: 75px;
    font-weight: 800;
    background: linear-gradient(89.97deg, #ae67fa 1.84%, #f49867 102.67%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
const ItemHeader = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: center;
  h4 {
    font-size: 22px;
    line-height: 22px;
    font-weight: 600;
  }
  p {
    font-size: 20px;
    margin: 0px 15px;
  }
  h6 {
    font-size: 14px;
  }
`;
const ItemText = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  h4 {
    font-size: 22px;
    line-height: 22px;
    font-weight: 600;
  }
  p {
    font-size: 20px;
    margin: 0px 15px;
  }
  h6 {
    font-size: 14px;
    line-height: 16px;
  }
`;
const ItemRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const ItemPicture = styled.div`
  flex: 2;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  img {
    width: 100px;
    margin: 0px 20px 0px 0px;
  }
`;
const CartItem = styled.div`
  padding: 10px 0px 0px 0px;
  border-top: 1px solid #eee;
`;
const Checkout = styled.div`
  width: 400px;
  border: 2px solid green;
`;
const CartDetails = styled.div`
  padding: 1rem 3rem;
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  gap: 10px;
  h1 {
    margin-bottom: 10px;
  }
`;
const CartArea = styled.div`
  //new start
  display: flex;
  margin: 2rem 6rem;
  background-color: #fff;
`;
