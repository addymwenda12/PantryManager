"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  getDoc,
  setDoc,
} from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quality } = docSnap.data();
      await updateDoc(docRef, {
        quality: quality + 1,
      });
    } else {
      await setDoc(docRef, {
        quantity: 1,
      });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quality === 1) {
        await deleteDoc(docRef);
      } else {
        await updateDoc(docRef, {
          quality: quality - 1,
        });
      }
    }
    await updateInventory();
  };
  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width="400"
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          padding={4}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant="outlined" onClick={() => addItem(itemName)}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="outlined" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" color="#333">
            Inventory Items
          </Typography>
        </Box>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
        {inventory.map(({ name, quantity }) => {
          return (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgcolor="f0f0f0"
              padding={5}
            >
              <Typography variant="h3" color="#333" textAlign="center">
                {name && (name.charAt(0).toUpperCase() + name.slice(1))}
              </Typography>
              <Typography variant="h5" color="#333" textAlign="center">
                Quantity: {quantity}
              </Typography>
              <Button variant="outlined" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
