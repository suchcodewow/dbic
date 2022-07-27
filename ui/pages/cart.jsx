import {
  Button,
  Grid,
  Stack,
  Typography,
  Rating,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import MenuBar from "components/Menubar";
import { useEffect, useState } from "react";

export default function cart() {
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  useEffect(() => {
    var localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      setCartItems(localCart);
    }
  }, []);

  const Item = styled(
    Paper,
    {}
  )({
    backgroundColor: "#FFFFFF",
    textAlign: "left",
    margin: "auto",
    borderRadius: 5,
    padding: 15,
    elevation: 0,
    height: "100%",
  });
  return (
    <div>
      <MenuBar cartItems={cartItems} />
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Item elevation={0}>
            {cartItems.length === 0 ? (
              <Typography>There is nothing in your cart! :/</Typography>
            ) : null}
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Card
                  elevation={0}
                  sx={{ display: "flex", padding: 1 }}
                  key={item.id}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151, maxheight: 200 }}
                    image={`/images/store/${item.img}`}
                  />
                  <CardContent>
                    <Box
                      component="div"
                      sx={{ display: "inline", alignItems: "center" }}
                      lineHeight="1.5rem"
                      fontSize="1.5rem"
                    >
                      ${item.price}
                    </Box>
                    <Box
                      component="div"
                      sx={{ display: "inline" }}
                      fontSize=".9rem"
                      lineHeight=".9rem"
                      textAlignVertical="top"
                    >
                      .00
                    </Box>
                    <Box
                      component="div"
                      sx={{ display: "inline" }}
                      fontSize="1rem"
                      ml="1rem"
                    >
                      quantity: {item.qty}
                    </Box>
                    <Rating readOnly value={item.rating} />
                  </CardContent>
                  <Typography variant="body">{item.shortDesc}</Typography>
                </Card>
              ))}
            </Stack>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item elevation={0}>
            <Typography>Total</Typography>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
