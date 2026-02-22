import { useEffect, useMemo, useState } from "react";
import { fetchUsers } from "../api/usersApi.js";
import SearchBar from "../components/SearchBar.jsx";
import AddUserForm from "../components/AddUserForm.jsx";
import UsersTable from "../components/UsersTable.jsx";
import SortControls from "../components/SortControls.jsx";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("idle"); // idle | loading | error | success
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    // Bonus sorting
    const [sortKey, setSortKey] = useState("name"); // name | email | company
    const [sortDir, setSortDir] = useState("asc"); // asc | desc

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

        return () => {
        mounted = false;
        };
    }, []);

    function handleAddUser(newUser) {
        // Insert at top (local only requirement)
        setUsers((prev) => [newUser, ...prev]);
    }

    const filteredAndSorted = useMemo(() => {
        const q = query.trim().toLowerCase();

        let list = users;

        // Search by name or email
        if (q) {
        list = list.filter((u) => {
            const name = (u.name || "").toLowerCase();
            const email = (u.email || "").toLowerCase();
            return name.includes(q) || email.includes(q);
        });
        }

        // Sort
        const getVal = (u) => {
        if (sortKey === "company") return (u.company?.name || "").toLowerCase();
        return (u[sortKey] || "").toLowerCase();
        };

        const sorted = [...list].sort((a, b) => {
        const av = getVal(a);
        const bv = getVal(b);
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
        });

        return sorted;
    }, [users, query, sortKey, sortDir]);

    return (
        <div className="page">
        <div className="page__header">
            <h1 className="h1">Users</h1>
            <p className="muted">
            Fetching from JSONPlaceholder • Search • Details • Add Local User
            </p>
        </div>

        <div className="grid">
            <section className="card">
            <h2 className="h2">Add new user (local)</h2>
            <AddUserForm onAdd={handleAddUser} />
            </section>

            <section className="card">
            <div className="row row--wrap">
                <SearchBar value={query} onChange={setQuery} />
                <SortControls
                sortKey={sortKey}
                sortDir={sortDir}
                onSortKeyChange={setSortKey}
                onSortDirChange={setSortDir}
                />
            </div>

            {status === "loading" && <div className="notice">Loading users…</div>}
            {status === "error" && (
                <div className="notice notice--error">Error: {error}</div>
            )}
            {status === "success" && (
                <UsersTable users={filteredAndSorted} />
            )}
            </section>
        </div>
        </div>
    );
}