import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-white shadow p-4 flex gap-4">
          <Link href="/">Dashboard</Link>
          <Link href="/customers">Customers</Link>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}