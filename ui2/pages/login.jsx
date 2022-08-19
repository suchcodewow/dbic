import styled from "styled-components";
import { useState } from "react";
import { useUserContext } from "contexts/UserContext";
import { Prefix, Name, NavBar } from "components";
import { useRouter } from "next/router";

export default function Login() {
  const { user, userDispatch, loading, errorMessage } = useUserContext();

  const router = useRouter();
  const selectedPrefix = Prefix[Math.floor(Math.random() * Prefix.length)];
  const selectedName = Name[Math.floor(Math.random() * Name.length)];
  const randomId =
    selectedPrefix.charAt(0).toUpperCase() +
    selectedPrefix.slice(1) +
    selectedName.charAt(0).toUpperCase() +
    selectedName.slice(1);
  const [userId, setUserId] = useState(randomId);
  const handleLogin = (e) => {
    e.preventDefault();
    userDispatch({ type: "LOGIN", userId });
  };

  return (
    <div>
      <NavBar />
      <Container>
        <FormContainer>
          <TextBlock>
            <h1>Sign Up & Sign In</h1>
            <blockquote>
              psst! hey there! This application is real and has a full suite of
              backend services spanning lots of technologies- but it's just for
              demonstration. It's built to showcase how dynatrace empowers you.
              Everything you experience as a user (good AND bad) is used by
              Dynatrace to identify incoming problems before users do. To
              expedite your exploration:
              <ul>
                <li>We're suggesting a random username (changeable)</li>
                <li>we're auto-saving your password</li>
                <li>
                  you'll get full access to our Operations Center (new top menu
                  option)
                </li>
                <li>a random shipping address is added to your account</li>{" "}
                <li>
                  you will get instant approval on a fabulous new DynaCard
                  credit card during checkout to speed through payment
                </li>
              </ul>
            </blockquote>
          </TextBlock>

          <Form onSubmit={handleLogin}>
            <FormItem
              type="text"
              id="userId"
              placeholder="UserName"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <FormItem
              input
              disabled
              readOnly
              placeholder="(autosaved)"
              type="password"
              id="password"
            />
            <DefaultButton type="submit" disabled={loading}>
              Sign in
            </DefaultButton>
          </Form>
        </FormContainer>
      </Container>
    </div>
  );
}
const DefaultButton = styled.button`
  padding: 0.5rem 0.5rem;
  color: #fff;
  bottom: 50px;
  background: #ff4820;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
`;
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
  border-radius: 15px;
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

  color: black;
  padding: 5px;
  border: 4 solid black;
  input: {
    font-size: 18px;
  }
`;
