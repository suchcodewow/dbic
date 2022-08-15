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
      <Section7>
        7
        <Section8>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
          <Section9>A</Section9>
        </Section8>
      </Section7>
      <Section10>
        <Section11>
          <Section13 key="1">
            <SectionPicture>img here</SectionPicture>
            description
          </Section13>
        </Section11>
        <Section12>12 Checkout</Section12>
      </Section10>
    </div>
  );
}

const SectionPicture = styled.div`
  img {
    width: 100px;
  }
`;
const Section13 = styled.div`
  border: 1px solid cyan;
  display: flex;
  gap: 10px;
  flex-flow: row nowrap;
`;

const Section12 = styled.div`
  width: 400px;
  border: 2px solid green;
`;

const Section11 = styled.div`
  padding: 0rem 1rem;
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  gap: 20px;
  border: 2px solid blue;
`;

const Section10 = styled.div`
  //new start
  display: flex;
  padding: 2rem 1rem; //vertical horizontal
  background-color: #fff;
  width: 100%;
  margin: auto;
`;
const Section9 = styled.div`
  width: 200px;
  height: 30px;
  border: 2px solid green;
`;

const Section8 = styled.div`
  //new start
  gap: 10px;
  width: 834px;
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
  /* flex-direction: column;
  justify-content: center; */
  margin: auto;
  border: 2px solid blue;
  @media all and (max-width: 950px) {
    width: 624px;
  }
`;

const Section7 = styled.div`
  display: flex;
  /* flex-direction: row;
  justify-content: center; */
  background-color: #fff;
  border: 2px solid green;
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
