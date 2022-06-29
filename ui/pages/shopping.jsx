import Head from "next/head";
import { React, useState, useEffect } from "react";
import Layout from "../components/Layout";

const Shopping = ({ catalog }) => {
  const BASE_URL = "http://localhost:8080/api/v1/catalog";
  const [catalogs, setCatalogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState(null);
  const [responseUser, setResponseUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const catalogs = await response.json();
        setCatalogs(catalogs);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>DBIC - Shopping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>We sell stuff!</h2>
      <table>
        {!loading && (
          <tbody>
            {catalogs?.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </Layout>
  );
};

export default Shopping;
