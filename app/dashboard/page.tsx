"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost/backend/checkAuth.php", {
          credentials: "include",
        });

        if (!res.ok) return router.push("/login");

        const data = await res.json();
        if (data.loggedIn) setUserId(data.user_id);
        else router.push("/login");
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch("http://localhost/backend/logout.php", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "24px", marginBottom: "20px" }}>Business</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a href="/Summary">📊 Summary</a>
          <a href="/transactions">💳 Transactions</a>
          <a href="/statistics">📈 Statistics</a>
          <a href="/products">📦 Products</a>
          <a href="/categories">🗂 Categories</a>
        </nav>
        <div style={{ marginTop: "auto", textAlign: "center" }}>
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            style={{ borderRadius: "50%", marginBottom: "10px" }}
          />
          <p>User #{userId}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "20px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h1>Business Dashboard</h1>
          <div>🔔 ⚙️</div>
        </header>

        <section style={{ display: "flex", gap: "20px" }}>
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
            }}
          >
            <h3>Customers</h3>
            <p>5,896</p>
          </div>
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
            }}
          >
            <h3>Income</h3>
            <p>$100,098</p>
          </div>
          <div
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#f3f4f6",
              borderRadius: "10px",
            }}
          >
            <h3>Products Sold</h3>
            <p>89,878</p>
          </div>
        </section>
      </main>
    </div>
  );
}
