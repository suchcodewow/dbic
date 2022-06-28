import Head from "next/head";
import { React, useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function shopping() {
  return (
    <Layout>
      <Head>
        <title>DBIC - Shopping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>We sell stuff!</h2>
    </Layout>
  );
}
