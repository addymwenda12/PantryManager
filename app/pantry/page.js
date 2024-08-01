import { getPantryItems } from "@/lib/pantryService";
import PantryList from "@/components/PantryList";

/* GET PANTRY ITEMS */
export default async function Pantry() {
  const items = await getPantryItems();

  return (
    <div>
      <h1>My Pantry</h1>
      <PantryList items={items} />
    </div>
  );
}