"use client";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../../lib/api";

export default function CreateOrder() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData("/api/customers").then(setCustomers);
    fetchData("/api/products").then(setProducts);
  }, []);

  function addItem() {
    setItems([...items, { product_id: "", quantity: 1 }]);
  }

  function updateItem(i, key, value) {
    const newItems = [...items];
    newItems[i][key] = value;
    setItems(newItems);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await postData("/api/orders", {
      customer_id: Number(customerId),
      items: items.map(i => ({
        product_id: Number(i.product_id),
        quantity: Number(i.quantity),
      })),
    });
    alert("Order created");
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={customerId} onChange={e => setCustomerId(e.target.value)} className="border p-2">
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <select onChange={e => updateItem(i, "product_id", e.target.value)} className="border p-2">
              <option value="">Product</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input type="number" value={item.quantity} onChange={e => updateItem(i, "quantity", e.target.value)} className="border p-2" />
          </div>
        ))}

        <button type="button" onClick={addItem} className="bg-gray-300 px-4 py-2">Add Item</button>
        <button className="bg-black text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
}
