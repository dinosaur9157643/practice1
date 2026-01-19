"use client"; // ⚠️ Must be at the top

import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  userId: number | null;
  onLogout: () => void;
};

export default function Dashboard({ userId, onLogout }: Props) {
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    console.log("Logging out...");
    onLogout();                 // Clear user state
    router.push("/login");      // Redirect to login page
  };

  return (
    <div className="dashboard" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className="sidebar"
        style={{
          width: "250px",
          backgroundColor: "#1f2937",
          color: "white",
          padding: "20px",
        }}
      >
        <div className="logo" style={{ fontSize: "24px", marginBottom: "20px" }}>
          Business
        </div>

        <nav className="nav" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/Summary">📊 Summary</Link>
          <Link href="/transactions">💳 Transactions</Link>
          <Link href="/statistics">📈 Statistics</Link>
          <Link href="/products">📦 Products</Link>
          <Link href="/categories">🗂 Categories</Link>
        </nav>

        <div className="user-card" style={{ marginTop: "auto", textAlign: "center" }}>
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

      {/* Main content */}
      <main className="main" style={{ flex: 1, padding: "20px" }}>
        <header
          className="header"
          style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}
        >
          <h1>Business Dashboard</h1>
          <div className="icons">🔔 ⚙️</div>
        </header>

        <section className="cards" style={{ display: "flex", gap: "20px" }}>
          <div className="card" style={{ flex: 1, padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "10px" }}>
            <h3>Customers</h3>
            <p>5,896</p>
          </div>
          <div className="card" style={{ flex: 1, padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "10px" }}>
            <h3>Income</h3>
            <p>$100,098</p>
          </div>
          <div className="card" style={{ flex: 1, padding: "20px", backgroundColor: "#f3f4f6", borderRadius: "10px" }}>
            <h3>Products Sold</h3>
            <p>89,878</p>
          </div>
        </section>
      </main>
    </div>
  );
}
