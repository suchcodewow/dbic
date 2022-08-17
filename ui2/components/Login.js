import styled from "styled-components";

export default function Login(props) {
  return (
    <Container>
      <FormContainer>
        <h1>Login Page</h1>

        <form>
          <Form>
            <FormItem>
              <label htmlFor="email">Username</label>
              <input type="text" id="email" />
            </FormItem>
            <FormItem>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </FormItem>
          </Form>
          <button>login</button>
        </form>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 200px;
`;

const error = styled.div`
  font-size: 0.8rem;
  color: #bb0000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
