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
        const res = await fetch(
          "http://localhost/backend/checkAuth.php",
          {
            method: "GET",
            credentials: "include", // ✅ must include session cookie
          }
        );

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data = await res.json();
        if (data.loggedIn) {
          setUserId(data.user_id);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost/backend/logout.php",
        {
          method: "POST",
          credentials: "include",
        }
      );
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, User #{userId}</h1>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
