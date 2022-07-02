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

export default function ItemCard({ item, handleDelete }) {
  return (
    <Card
      sx={{
        "&:hover": { boxShadow: 3 },
        width: 300,
      }}
    >
      <CardHeader
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
      ></CardHeader>
      <CardMedia
        component="img"
        width="300"
        image={`/images/store/${item.img}`}
        alt={item.title}
      />
    </Card>
  );
}
