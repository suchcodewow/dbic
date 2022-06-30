import { React, useState, useEffect } from "react";
const { publicRuntimeConfig } = require("next.config");
import NewItem from "components/NewItem";
import { alpha, Grid, Box, styled } from "@mui/material";
import Link from "next/link";

const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  borderRadius: 6,
  boxShadow: theme.shadows[1],
  transition: "all 250ms ease-in-out",
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.between("sm", "md")]: {
    "&": {
      display: "flex",
      alignItems: "center",
      padding: "2rem",
    },
    "& .content": {
      padding: "0",
      width: "50%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "&": {
      padding: "2rem",
    },
    "& .content": {
      padding: 0,
      marginTop: 10,
    },
  },
}));

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
      <NewItem catalog={catalog} setCatalog={setCatalog} />
      <h2>We sell stuff!</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link href="/">
            <a>
              <StyledBox>
                <Box
                  component="img"
                  src="/images/store/shoes-1.png"
                  alt="shoes"
                  sx={{ padding: "2.5rem" }}
                />
              </StyledBox>
            </a>
          </Link>
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
