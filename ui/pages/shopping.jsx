import Head from "next/head";
import { React, useState, useEffect } from "react";
const { publicRuntimeConfig } = require("next.config");
import NewItem from "components/NewItem";
import { Grid } from "@mui/material";

export default function Shopping({ asdf }) {
  const BASE_URL = publicRuntimeConfig.apiCatalog;
  const [catalog, setCatalog] = useState(null);
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
        const catalog = await response.json();
        setCatalog(catalog);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [asdf]);

  const deleteItem = (e, id) => {
    e.preventDefault();
    fetch(BASE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (catalog) {
        setCatalog((prevElement) => {
          return prevElement.filter((item) => item.id !== id);
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>DBIC - Shopping</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewItem catalog={catalog} setCatalog={setCatalog} />
      <h2>We sell stuff!</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          1
        </Grid>
      </Grid>
      <table>
        {!loading && (
          <tbody>
            {catalog?.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.shortDesc}</td>
                <td>
                  <a onClick={(e, id) => deleteItem(e, item.id)}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}
