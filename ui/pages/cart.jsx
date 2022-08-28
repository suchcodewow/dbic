import { Carousel, CheckoutPanel, NavBar, OrderFinishPanel } from "components";
import styled from "styled-components";
import { useCartContext } from "contexts/CartContext";
import { useUserContext } from "contexts/UserContext";
import { RiAddFill, RiSubtractFill, RiDeleteBin2Line } from "react-icons/ri";
import Dynacard from "components/Dynacard";
import { useState } from "react";
import PaymentPanel from "components/Payment";

export default function Cart() {
  const { cart, cartDispatch } = useCartContext();
  const { user, userDispatch } = useUserContext();
  const [CheckoutOpen, setCheckoutOpen] = useState(false);
  const [PaymentOpen, setPaymentOpen] = useState(false);
  const [OrderFinishOpen, setOrderFinishOpen] = useState(false);
  let cartTotal = 0;
  let totalItems = 0
  //TODO: deal with the cart returning no items.  Possible problem card?
  cart.map((item) => (cartTotal += item.price * item.qty));
  cart.map((item) => (totalItems += item.qty));
  return 
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
          <CheckoutTotal>
            <h2>Sub-Total: ${cartTotal}</h2>
            <h4>.00</h4>
          </CheckoutTotal>
          <CheckoutButton onClick={() => setCheckoutOpen(true)}>
            checkout
          </CheckoutButton>
        </Checkout>
        <CheckoutPanel
          cartTotal={cartTotal}
          user={user}
          userDispatch={userDispatch}
          setPaymentOpen={setPaymentOpen}
          CheckoutOpen={CheckoutOpen}
          setCheckoutOpen={setCheckoutOpen}
        />
        <PaymentPanel
          cartTotal={cartTotal}
          totalItems={totalItems}
          user={user}
          userDispatch={userDispatch}
          cartDispatch={cartDispatch}
          setPaymentOpen={setPaymentOpen}
          PaymentOpen={PaymentOpen}
          setCheckoutOpen={setCheckoutOpen}
          setOrderFinishOpen={setOrderFinishOpen}
        />
        <OrderFinishPanel
          user={user}
          OrderFinishOpen={OrderFinishOpen}
          setOrderFinishOpen={setOrderFinishOpen}
        />
      </CartArea>
    </div>
  );
}

const CheckoutButton = styled.button`
  padding: 0.5rem 3rem;
  color: #fff;
  background: #ff4820;
  font-weight: 500;
  font-size: 22px;
  line-height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
`;
const CheckoutTotal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 20px 0px;
`;
const CheckoutHeader = styled.div`
  width: 100%;

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
  width: 300px;
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
