import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1>Welcome to the Pantry</h1>
      <nav>
        <ul>
          <li>
            <Link href="/pantry">
              View Pantry
            </Link>
          </li>
          <li>
            <Link href="/add-item">
              Add Item
            </Link>
          </li>
          <li>
            <Link href="/remove-item">
              Remove Item
            </Link>
          </li>
          <li>
            <Link href="/update-item">
              Update Item
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}