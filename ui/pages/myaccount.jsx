import { getData, NavBar } from "components";
import styled from "styled-components";
import { useEffect, useState } from "react";
const { publicRuntimeConfig } = require("next.config.js");
import { useUserContext } from "contexts/UserContext";
import { useRouter } from "next/router";

export default function account() {
  const { query } = useRouter();
  const [Orders, setOrders] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      // const BASE_URL = publicRuntimeConfig.apiOrders;
      const response = await fetch(
        process.env.NEXT_PUBLIC_clientordersapi + "/myorders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            AuthId: user.user,
          },
        }
      );
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
        {query.ordercomplete && (
          <h1>Your order is # {query.ordercomplete}. Thanks!</h1>
        )}
        <h1>Orders</h1>

        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Status</th>
              <th>Items Ordered</th>
              <th>Order Total</th>
            </tr>
          </thead>
          <tbody>
            {Orders?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.status}</td>
                <td>{item.totalItems}</td>
                <td>{item.cartTotal}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
        {Orders.length == 0 && <h2>No orders found.</h2>}
      </BaseDiv>
    </div>
  );
}

const BaseDiv = styled.div`
  margin: 2rem;
  padding: 2rem;
  background-color: #fff;
`;
