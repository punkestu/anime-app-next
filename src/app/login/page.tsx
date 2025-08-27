"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful");
          window.location.href = "/";
        }
      })
      .catch(() => {
        alert("An error occurred. Please try again.");
      });
  }
  return (
    <form
      className="flex flex-col gap-2 p-4 m-8 bg-slate-100 dark:bg-gray-900 dark:text-white rounded"
      onSubmit={handleLogin}
    >
      <h1 className="font-bold text-xl text-center">Masuk</h1>
      <input
        type="text"
        placeholder="Username"
        className="dark:text-white dark:bg-black rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="dark:text-white dark:bg-black rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2">
        Masuk
      </button>
    </form>
  );
}
