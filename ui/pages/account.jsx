import { NavBar } from "components";
import styled from "styled-components";
import { useEffect, useState } from "react";
const { publicRuntimeConfig } = require("next.config");

export default function account() {
  const [Orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const BASE_URL = publicRuntimeConfig.apiOrders;
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setOrders(data);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <div>
      <NavBar />
      <BaseDiv>
        Orders:
        {Orders?.map((item) => (
          <div key={item.id}>{item.cartTotal} </div>
        ))}
      </BaseDiv>
    </div>
  );
}

const BaseDiv = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: #fff;
`;
