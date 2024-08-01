import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Pantry</h1>
      <nav>
        <ul>
          <li>
            <Link href="/pantry">
              <a>View Pantry</a>
            </Link>
          </li>
          <li>
            <Link href="/add-item">
              <a>Add Item</a>
            </Link>
          </li>
          <li>
            <Link href="/remove-item">
              <a>Remove Item</a>
            </Link>
          </li>
          <li>
            <Link href="/update-item">
              <a>Update Item</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};