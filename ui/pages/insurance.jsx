import Head from "next/head";
import { Button } from "@mui/material";
import Layout from "../components/Layout";

export default function insurance() {
  return (
    <Layout>
      <Head>
        <title>DBIC - Insurance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>We sell insurance!</h1>
      <h1 className="title">
        <Button variant="contained">Click the Butt!</Button>
      </h1>
    </Layout>
  );
}
