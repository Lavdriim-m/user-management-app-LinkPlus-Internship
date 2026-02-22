export default function SearchBar({ value, onChange }) {
    return (
        <div className="field">
            <label className="label" htmlFor="search">Search</label>
            <input
            id="search"
            className="input"
            placeholder="Search by name or email…"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}