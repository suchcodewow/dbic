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
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardContent>
                      <div style={{ display: "flex" }}>
                        <Typography variant="h5">${item.price}</Typography>
                        <Typography variant="subtitle1">.00</Typography>
                      </div>
                      <Typography variant="body">{item.shortDesc}</Typography>
                    </CardContent>
                  </Box>
                </Card>
                // <Box key={item.id}>
                //   <Grid container>
                //     <Grid container item xs={2}>
                //       <Box
                //         component="img"
                //         sx={{ width: 100 }}
                //         src={`/images/store/${item.img}`}
                //       />
                //     </Grid>
                //     <Grid container item xs={10}>
                //       <Rating value={parseInt(item.rating)} readOnly />
                //       <Typography variant="body">
                //         {" "}
                //         ${item.price}.00 {parseInt(item.rating)}
                //       </Typography>

                //       <Typography variant="body">{item.shortDesc}</Typography>
                //       <Divider />

                //       <Button disableElevation>remove</Button>
                //     </Grid>
                //   </Grid>
                // </Box>
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
