import { useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

// We'll refetch the full list quickly on this page too (simple approach)
// In a bigger app you'd share state, but this is totally fine for the challenge.
import { useEffect, useState } from "react";
import { fetchUsers } from "../api/usersApi.js";

export default function UserDetailsPage() {
    const { id } = useParams();
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const location = useLocation();
    const stateUser = location.state?.user;

    useEffect(() => {
        let mounted = true;
        setStatus("loading");
        fetchUsers()
        .then((data) => {
            if (!mounted) return;
            setUsers(data);
            setStatus("success");
        })
        .catch((e) => {
            if (!mounted) return;
            setError(e.message || "Something went wrong");
            setStatus("error");
        });
        return () => (mounted = false);
    }, []);

    const user = useMemo(() => {
        if (stateUser) return stateUser;
        const numId = Number(id);
        return users.find((u) => u.id === numId);
    }, [users, id, stateUser]);

    if (status === "loading") {
        return <div className="card">Loading user…</div>;
    }

    if (status === "error") {
        return <div className="card">Error: {error}</div>;
    }

    if (!user) {
        return (
        <div className="card">
            <p>User not found.</p>
            <Link to="/users" className="btn">Back</Link>
        </div>
        );
    }

    const address = user.address
        ? `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`
        : "—";

    return (
        <div className="page">
        <div className="page__header">
            <h1 className="h1">{user.name}</h1>
            <p className="muted">{user.email}</p>
        </div>

        <div className="card">
            <div className="details">
            <div className="details__item">
                <div className="label">Phone</div>
                <div>{user.phone || "—"}</div>
            </div>
            <div className="details__item">
                <div className="label">Website</div>
                <div>
                {user.website ? (
                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                    {user.website}
                    </a>
                ) : (
                    "—"
                )}
                </div>
            </div>
            <div className="details__item">
                <div className="label">Address</div>
                <div>{address}</div>
            </div>
            <div className="details__item">
                <div className="label">Company</div>
                <div>{user.company?.name || "—"}</div>
            </div>
            </div>

            <div className="row">
            <Link to="/users" className="btn">Back to users</Link>
            </div>
        </div>
        </div>
    );
}