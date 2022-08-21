import styled from "styled-components";
import { useTestContext } from "contexts/TestContext";

export default function test() {
  const { test, testDispatch } = useTestContext();
  console.log(test);
  return (
    <Frame>
      blah
      <BigButton
        onClick={() => {
          testDispatch({ type: "ADD", todo: "die" });
        }}
      >
        go
      </BigButton>
    </Frame>
  );
}

const BigButton = styled.button`
  font-size: 38px;
`;
const Frame = styled.div`
  display: flex;
  flex-flow: column nowrap;
  font-size: 52px;
  padding: 3rem;
  background-color: #fff;
`;
