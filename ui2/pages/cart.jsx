import { NavBar } from "components";
import styled from "styled-components";

export default function Cart() {
  return (
    <div>
      <Section1>
        1
        <Section2>
          2<Section3>3</Section3>
        </Section2>
      </Section1>
      <Section4>
        4<Section5>5</Section5>
        <Section6>6</Section6>
        <Section5>5</Section5>
      </Section4>
      <Section4>
        4
        <Section7>
          <p>7</p>
        </Section7>
        <Section8>
          <p>8</p>
        </Section8>
        <Section7>
          <p>7</p>
        </Section7>
      </Section4>
    </div>
  );
}

const Section8 = styled.div`
  align-items: center;
  font-size: 18px;
  line-height: 28px;
  vertical-align: top;
`;

const Section7 = styled.div`
  font-size: 56px;
  line-height: 28px;
`;

const Section6 = styled.div`
  width: 150px;
  height: 100px;
  align-items: center;
  border: 4px solid green;
  line-height: 28px;
`;

const Section5 = styled.div`
  width: 150px;
  height: 100px;
  align-items: center;
  border: 4px solid green;
  font-size: 28px;
  line-height: 28px;
`;

const Section4 = styled.div`
  display: flex;
  justify-content: top;
  align-items: flex-start;
  padding: 0rem 2rem;
  border: 4px solid blue;
  background-color: #fff;
`;

const Section3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  border: 4px solid red;
`;
const Section2 = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 4px solid green;
`;

const Section1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem;
  border: 4px solid blue;
  background-color: #fff;
`;
