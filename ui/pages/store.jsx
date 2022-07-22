import { React, useState, useEffect } from "react";
const { publicRuntimeConfig } = require("next.config");
import NewItem from "components/NewItem";
import { Grid, Typography } from "@mui/material";

import ItemCard from "components/ItemCard";

export default function Store({ asdf }) {
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
  }, []);

  const handleDelete = (id) => {
    fetch(BASE_URL + "/" + id, {
      method: "DELETE",
    }).then((res) => {
      if (catalog) {
        setCatalog((newList) => {
          return newList.filter((item) => item.id !== id);
        });
      }
    });
  };

  return (
    <div>
      <NewItem catalog={catalog} setCatalog={setCatalog} />
      {loading && <Typography>loading...</Typography>}
      {!loading && (
        <Grid maxwidth={1080} container spacing={1}>
          {catalog?.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <ItemCard item={item} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
