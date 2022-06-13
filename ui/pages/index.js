import { Button, CssBaseline } from "@mui/material";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="title">
        <Link href="/insurance">Check out our insurance offering!</Link>
        <Button variant="contained">Click the Butt!</Button>
      </h1>
    </div>
  );
}
