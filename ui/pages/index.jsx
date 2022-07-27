import Head from "next/head";
import { useState } from "react";
import MenuBar from "components/Menubar";

export default function Home() {
  const user = useState(null);
  return (
    <div className="container">
      <Head>
        <title>DBIC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar />
    </div>
  );
}
