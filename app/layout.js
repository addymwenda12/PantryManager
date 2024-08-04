import { Inter } from "next/font/google";
import Link from "next/link";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Management App",
  description: "Keep track of your pantry items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout">
          <nav className="sidebar">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/pantry">Pantry</Link>
              </li>
              <li>
                <Link href="/add-item">Add Item</Link>
              </li>
              <li>
                <Link href="/image-upload">Image Upload</Link>
              </li>
              <li>
                <Link href="/recipes">Recipes</Link>
              </li>
            </ul>
          </nav>
          <main className="content">
            <header>
              <h1>{metadata.title}</h1>
              <p>{metadata.description}</p>
            </header>
            {children}
          </main>
        </div>
        <footer>
          <p>&copy; Panrty App</p>
        </footer>
      </body>
    </html>
  );
}