import styled from "styled-components";

export default function Dynacard() {
  return (
    <AdArea>
      <p>
        Save <span> up to $95 on your order</span> when you open a new DynaCard
        during checkout.
      </p>
    </AdArea>
  );
}

const AdArea = styled.div`
  background-color: #fff;
  text-align: center;
  margin: 2rem 24rem;
  padding: 1rem;
  p {
    font-size: 18px;
    font-weight: 600;
  }
  span {
    color: red;
  }
`;
