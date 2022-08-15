import { createGlobalStyle } from "styled-components";
import { CartProvider } from "contexts/CartContext";
const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    scroll-behavior: smooth;
}
body {
  background: #040C18;
font-family: 'Manrope', sans-serif;
min-height:100vh;
}
.bgdiv {

  background:-moz-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%);

  /* safari 5.1+,chrome 10+ */
  background:-webkit-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%);

  /* opera 11.10+ */
  background:-o-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%);

  /* ie 10+ */
  background:-ms-radial-gradient(circle at 3% 25%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 25%);

  /* global 92%+ browsers support */
  background:radial-gradient(circle at 25% 40%, rgba(0, 40, 83, 1) 0%, rgba(4, 12, 24, 1) 90%);
}
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </CartProvider>
  );
}
