import { Inter } from "next/font/google";
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
        <header>
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024</p>
        </footer>
      </body>
    </html>
  );
}
