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
        title={item.title}
      ></CardHeader>
      <CardMedia
        component="img"
        width="300"
        border="1"
        image="/images/store/flash-1.png"
        alt={item.title}
      />
    </Card>
  );
}
