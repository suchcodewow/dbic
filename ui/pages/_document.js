import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet" />
        </Head>
        <body className="bg-gradient-radial  z-10 h-screen flex flex-col">
          <div className="flex flex-1 w-full ">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
