import styled from "styled-components";
import { useState } from "react";
import { useUserContext } from "contexts/UserContext";
import { NavBar } from "components";

export default function Login(props) {
  const { user, userDispatch, loading, errorMessage } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    userDispatch({ type: "REQUEST_LOGIN", userId });
  };

  return (
    <div>
      <NavBar />
      <Container>
        <FormContainer>
          <TextBlock>
            <h1>Login</h1>
            <blockquote>
              psst! Hey there! This application is real and has a full suite of
              backend services spanning lots of technologies- but it's just for
              demonstration. It's built to showcase the incredible power of
              Dynatrace. Everything you experience as a user (good AND bad) is
              used by Dynatrace to identify incoming problems before users do.
              To give you the full access quickly:
              <ul>
                <li>We're suggesting a random username (changeable)</li>
                <li>we're auto-saving your password</li>
                <li>
                  you'll get full access to our Operations Center (new top menu
                  option)
                </li>
                <li>your account will have a random pre-saved address</li>{" "}
                <li>
                  you will get instant approval on a fabulous new DynaCard
                  credit card during checkout to speed through payment
                </li>
              </ul>
            </blockquote>
          </TextBlock>

          <Form onClick={handleLogin}>
            <FormItem type="text" id="userId" placeholder="UserName" />
            <FormItem
              input
              disabled
              placeholder="(autosaved)"
              type="password"
              id="password"
            />

            <button type="submit" disabled={loading}>
              login
            </button>
          </Form>
        </FormContainer>
      </Container>
    </div>
  );
}
const TextBlock = styled.div`
  blockquote {
    background-color: lightgreen;
    border-left-color: darkgreen;
    border-left-width: 4px;
    border-left-style: solid;
    font-size: 95%;
    padding: 2rem;
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ul {
    margin-left: 20px;
    margin-top: 10px;
  }
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
`;

const FormContainer = styled.div`
  padding: 2rem;
  width: 700px;

  background-color: #fff;
`;

const Form = styled.form`
  padding: 2rem;
`;

const FormItem = styled.input`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-size: 18px;
  background-color: lightblue;
  color: black;
  padding: 5px;
  border: 0;
  input: {
    font-size: 18px;
  }
`;
