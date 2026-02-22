import { useState } from "react";

function isValidEmail(email) {
    // simple beginner-friendly check
    return /\S+@\S+\.\S+/.test(email);
}

export default function AddUserForm({ onAdd }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [errors, setErrors] = useState({});

    function validate() {
        const next = {};
        if (!name.trim()) next.name = "Name is required";
        if (!email.trim()) next.email = "Email is required";
        else if (!isValidEmail(email.trim())) next.email = "Email format looks wrong";
        return next;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const nextErrors = validate();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        const newUser = {
        id: Date.now(), // local-only id
        name: name.trim(),
        email: email.trim(),
        company: { name: company.trim() || "—" },
        // optional fields (not required, but helps details page if clicked)
        phone: "—",
        website: "—",
        address: { street: "—", suite: "—", city: "—", zipcode: "—" },
        };

        onAdd(newUser);

        setName("");
        setEmail("");
        setCompany("");
        setErrors({});
    }

    return (
        <form onSubmit={handleSubmit} className="form">
        <div className="field">
            <label className="label" htmlFor="name">Name *</label>
            <input
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lavdrim M."
            />
            {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="field">
            <label className="label" htmlFor="email">Email *</label>
            <input
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. lavdrim@example.com"
            />
            {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="field">
            <label className="label" htmlFor="company">Company (optional)</label>
            <input
            id="company"
            className="input"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. LinkPlus"
            />
        </div>

        <button className="btn btn--primary" type="submit">
            Add User
        </button>

        <p className="muted small">
            * Required. User is added locally at the top of the list.
        </p>
        </form>
    );
}