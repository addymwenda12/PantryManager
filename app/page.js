'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import {firestore} from "@/firebase";
import { Box, Typography } from "@mui/material";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        id: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList);
  }

  useEffect(() => {
    updateInventory();
  }, []);
  return (
    <Box>
      <Typography variant='h1'>Inventory app</Typography>
      {
        inventory.forEach((item) => {
          return (
            <Box key={item.id}>
              <Typography>{item.name}</Typography>
              <Typography>{item.quantity}</Typography>
            </Box>
          )
        })
      }
    </Box>
  );
}