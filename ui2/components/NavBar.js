import { RiMenu3Line, RiCloseLine, RiShoppingCartLine } from "react-icons/ri";
import styled from "styled-components";
const logo = "images/wow.png";
import { useState } from "react";
import { useCartContext, useCartDispatchContext } from "contexts/CartContext";

const Menu = () => {
  // const { cartItems } = props;
  const cart = useCartContext();
  var cartTotal = 0;
  if (cart) {
    cart.map((item) => (cartTotal += item.qty));
  }
  return (
    <>
      <Link as="a" href="/">
        Home
      </Link>
      <Link as="a" href="/Banking">
        Banking
      </Link>
      <Link as="a" href="/Insurance">
        Insurance
      </Link>
      <Link as="a" href="/store">
        Store
      </Link>
      {cartTotal > 0 && (
        <Link as="a" href="/cart">
          <Cart>
            <p>{cartTotal}</p>
            <RiShoppingCartLine size={27} color={"green"} />
          </Cart>
        </Link>
      )}
    </>
  );
};

const Cart = styled.div`
  display: flex;
  background-color: #fff;
  padding: 8px 10px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  p {
    color: green;
    font-weight: 800;
    font-size: 24px;
    margin-right: 5px;
  }
`;

export default function NavBar(props) {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <Container>
      <TopBar>
        <Logo>
          <img width="32px" src={logo} alt="logo" />
        </Logo>
        <NavContainer>
          <Menu props={props} />
        </NavContainer>
      </TopBar>
      <Sign>Sign in</Sign>
      <NavBarMenu>
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <PopoutMenu>
            <Menu />
          </PopoutMenu>
        )}
      </NavBarMenu>
    </Container>
  );
}

const PopoutMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  text-align: end;
  background: #031b34;
  padding: 2rem;
  position: absolute;
  right: 0;
  top: 40px;
  margin-top: 1rem;
  min-width: 210px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const NavBarMenu = styled.button`
  background-color: transparent;
  border: 0px;
  margin-left: 1rem;
  display: none;
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 700px) {
    display: flex;
  }
`;
const Sign = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  background: #ff4820;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
`;

const Link = styled.button`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-transform: capitalize;
  margin: 0 1rem;
  cursor: pointer;
`;
const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
`;

const TopBar = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = styled.div`
  margin-right: 2rem;
`;
