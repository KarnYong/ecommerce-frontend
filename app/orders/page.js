"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../../lib/api";
import Table from "../../components/Table";
import Link from "next/link";

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData("/api/orders").then(setData);
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Orders</h1>
        <Link href="/orders/create" className="bg-black text-white px-4 py-2">Create Order</Link>
      </div>
      <Table columns={["id", "customer_id", "total", "status"]} data={data} />
    </div>
  );
}