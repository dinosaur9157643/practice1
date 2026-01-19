"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import "./dashboard.module.css";

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
            credentials: "include",
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

  if (loading) return <p className="loading">Loading...</p>;

  return <Dashboard userId={userId} onLogout={handleLogout} />;
}
