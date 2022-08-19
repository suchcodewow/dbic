import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (props.variant ? "green" : "blue")};
  height: 50px;
`;

export default function Button({ label, ...props }) {
  return <StyledButton {...props}>{label}</StyledButton>;
}
