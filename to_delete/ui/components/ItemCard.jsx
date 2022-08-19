import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ItemCard({ item, handleDelete, onAdd }) {
  return (
    <Card
      key={item.id}
      sx={{
        "&:hover": { boxShadow: 0, border: 1, borderColor: "#EFEFEF" },
        width: 220,
        height: 300,
      }}
    >
      {/* <CardHeader
        action={
          <IconButton
            onClick={() => {
              handleDelete(item.id);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        }
        titleTypographyProps={{
          fontSize: 16,
        }}
        title={item.title}
        subheader={item.category}
      ></CardHeader> */}
      <CardMedia
        component="img"
        image={`/images/store/${item.img}`}
        alt={item.title}
        height={280}
      />
      <button onClick={() => onAdd(item)}>Add To Cart{item.rating}</button>
    </Card>
  );
}
