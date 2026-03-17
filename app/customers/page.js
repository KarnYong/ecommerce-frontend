"use client";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../lib/api";
import Table from "../../components/Table";

export default function Customers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  async function load() {
    try {
      setLoading(true);
      const res = await fetchData("/api/customers");
      setData(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await postData("/api/customers", form);
    setForm({ name: "", email: "" });
    load();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2" />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="border p-2" />
        <button className="bg-black text-white px-4">Add</button>
      </form>
      <Table columns={["id", "name", "email"]} data={data} />
    </div>
  );
}