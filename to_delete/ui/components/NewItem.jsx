import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
const { publicRuntimeConfig } = require("next.config");

export default function NewItem({ catalog, setCatalog }) {
  const BASE_URL = publicRuntimeConfig.apiCatalog;
  const [test, setTest] = useState("hi");
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState({
    id: "",
    title: "",
    shortDesc: "",
    img: "",
  });
  const [responseItem, setResponseItem] = useState({
    id: "",
    title: "",
    shortDesc: "",
    img: "",
  });
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setItem({ ...item, [event.target.id]: value });
  };

  const saveItem = async (x) => {
    x.preventDefault();
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new error("Failed to POST new item");
    }
    const _item = await response.json();
    console.log(_item);
    setCatalog([...catalog, _item]);
    setResponseItem(_item);
    reset(x);
  };

  const reset = (x) => {
    x.preventDefault();
    setItem({
      id: "",
      title: "",
      shortDesc: "",
      img: "",
    });
    closeModal();
  };

  return (
    <>
      <Button onClick={openModal}>New Item</Button>
      <Dialog open={isOpen} onClose={reset}>
        <DialogTitle>Add an item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="title"
            label="Item Name"
            variant="outlined"
            value={item.title}
            onChange={(x) => handleChange(x)}
          />
          <TextField
            required
            id="img"
            label="Image"
            variant="outlined"
            value={item.img}
            onChange={(x) => handleChange(x)}
          />
          <TextField
            required
            id="shortDesc"
            label="a short description"
            variant="outlined"
            value={item.shortDesc}
            onChange={(x) => handleChange(x)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveItem}>save</Button>
          <Button onClick={reset}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
