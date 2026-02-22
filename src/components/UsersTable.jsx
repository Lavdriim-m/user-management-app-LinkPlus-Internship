import { Link } from "react-router-dom";

export default function UsersTable({ users }) {
    if (!users.length) {
        return <div className="notice">No users found.</div>;
    }

    return (
        <div className="tableWrap">
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th className="hide-sm">Email</th>
                <th className="hide-sm">Company</th>
                <th />
            </tr>
            </thead>
            <tbody>
            {users.map((u) => (
                <tr key={u.id}>
                <td>
                    <div className="cellMain">{u.name}</div>
                    <div className="cellSub show-sm">{u.email}</div>
                    <div className="cellSub show-sm">{u.company?.name || "—"}</div>
                </td>
                <td className="hide-sm">{u.email}</td>
                <td className="hide-sm">{u.company?.name || "—"}</td>
                <td className="right">
                    <Link to={`/users/${u.id}`} className="btn btn--ghost">
                    Details
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}