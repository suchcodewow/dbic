import { RiMenu3Line, RiCloseLine, RiShoppingCartLine } from "react-icons/ri";
import styled from "styled-components";
const logo = "images/wow.png";
import { useState } from "react";

const Menu = ({ props }) => {
  const { cartItems } = props;
  var cartTotal = 0;
  if (cartItems) {
    cartItems.map((item) => (cartTotal += item.qty));
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

/* .gpt3__navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 6rem;
}

.gpt3__navbar-links {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.gpt3__navbar-links_logo {
  margin-right: 2rem;
}

.gpt3__navbar-links_logo img {
  width: 62.56px;
  height: 16.02px;
}

.gpt3__navbar-links_container {
  display: flex;
  flex-direction: row;
}

.gpt3__navbar-sign {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.gpt3__navbar-links_container p,
.gpt3__navbar-sign p,
.gpt3__navbar-menu_container p {
  color: #fff;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  text-transform: capitalize;

  margin: 0 1rem;
  cursor: pointer;
}

.gpt3__navbar-sign button,
.gpt3__navbar-menu_container button {
  padding: 0.5rem 1rem;
  color: #fff;
  background: #FF4820;
  font-family: var(--font-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
}

.gpt3__navbar-menu {
  margin-left: 1rem;


}

.gpt3__navbar-menu svg {
  cursor: pointer;
}

.gpt3__navbar-menu_container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;

  text-align: end;
  background: var(--color-footer);
  padding: 2rem;
  position: absolute;
  right: 0;
  top: 40px;
  margin-top: 1rem;
  min-width: 210px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0,0, 0,0.2);
}

.gpt3__navbar-menu_container p {
  margin: 1rem 0;
}

.gpt3__navbar-menu_container-links-sign {
  display: none;
}

@media screen and (max-width: 1050px) {
  .gpt3__navbar-links_container {
      display: none;
  }

  .gpt3__navbar-menu {
      display: flex;
  }
}

@media screen and (max-width: 700px) {
  .gpt3__navbar {
      padding: 2rem 4rem;
  }
}

@media screen and (max-width: 550px) {
  .gpt3__navbar {
      padding: 2rem;
  }

  .gpt3__navbar-sign {
      display: none;
  }

  .gpt3__navbar-menu_container {
      top: 20px;
  }

  .gpt3__navbar-menu_container-links-sign {
      display: block;
  }
}
 */
