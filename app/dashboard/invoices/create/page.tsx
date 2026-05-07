"use client";

import { useState } from "react";

export default function CreateInvoice() {
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch("/api/invoices", {
      method: "POST",
      body: JSON.stringify({ customer, amount: Number(amount) }),
    });

    window.location.href = "/dashboard/invoices";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Customer" onChange={(e) => setCustomer(e.target.value)} />
      <input placeholder="Amount" type="number" onChange={(e) => setAmount(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}
