import { Menu } from "@headlessui/react";
import styled from "styled-components";
import { useUserContext } from "contexts/UserContext";
import { useCartContext } from "contexts/CartContext";
import { useRouter } from "next/router";
import { RiUserLine } from "react-icons/ri";

export default function DropDown({ userName }) {
  const { user, userDispatch } = useUserContext();
  const { cart, cartDispatch } = useCartContext();
  const router = useRouter();
  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
    cartDispatch({ type: "CLEAR_CART" });
    router.push({
      pathname: "/",
    });
  };
  return (
    <DropDownStyled>
      <Menu>
        <Menu.Button>
          <RiUserLine size={20} />
          {userName}
        </Menu.Button>
        <Menu.Items className="MenuBlock">
          <MenuItem>
            <Menu.Item>
              {({ active }) => (
                <Link
                  as="a"
                  className={`${active && "selected"}`}
                  href="/myaccount"
                >
                  Account
                </Link>
              )}
            </Menu.Item>
          </MenuItem>
          <MenuItem>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={`${active && "selected"}`}
                  onClick={handleLogout}
                >
                  logout
                </Link>
              )}
              {/* <Link onClick={handleLogout}>logout</Link> */}
            </Menu.Item>
          </MenuItem>
        </Menu.Items>
      </Menu>
    </DropDownStyled>
  );
}
const Link = styled.div`
  color: #000;
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-transform: capitalize;
  margin: 0 0.5rem;
  cursor: pointer;
`;
const MenuItem = styled.div`
  /* flex: 0 25%; */
  margin: 10px;
`;
const DropDownStyled = styled.div`
  button {
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
  }
  .MenuBlock {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    background-color: #fff;
    padding: 4px;
    margin-top: 8px;
    border-radius: 5px;
  }
  .selected {
    color: #ff4820;
  }
`;
