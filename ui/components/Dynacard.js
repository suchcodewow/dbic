import styled from "styled-components";

export default function Dynacard() {
  return (
    <AdArea>
      <p>
        Save <span className="highlight"> up to $95 on your order</span> when
        you open a new <span className="dynacard">DynaCard</span> during
        checkout.
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
  .highlight {
    color: red;
  }
  .dynacard {
    background: linear-gradient(90deg, #ae67fa 30%, #f49867 50%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
