"use client";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../lib/api";
import Table from "../../components/Table";

export default function Products() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  async function load() {
    const res = await fetchData("/api/products");
    setData(res);
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await postData("/api/products", {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
    setForm({ name: "", price: "", stock: "" });
    load();
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2" />
        <input placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border p-2" />
        <input placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="border p-2" />
        <button className="bg-black text-white px-4">Add</button>
      </form>
      <Table columns={["id", "name", "price", "stock"]} data={data} />
    </div>
  );
}