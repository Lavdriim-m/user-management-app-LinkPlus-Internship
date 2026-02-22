export default function SortControls({
    sortKey,
    sortDir,
    onSortKeyChange,
    onSortDirChange,
}) {
    return (
        <div className="row row--wrap">
            <div className="field field--compact">
            <label className="label" htmlFor="sortKey">Sort</label>
            <select
                id="sortKey"
                className="input"
                value={sortKey}
                onChange={(e) => onSortKeyChange(e.target.value)}
            >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="company">Company</option>
            </select>
            </div>
    
            <div className="field field--compact">
            <label className="label" htmlFor="sortDir">Direction</label>
            <select
                id="sortDir"
                className="input"
                value={sortDir}
                onChange={(e) => onSortDirChange(e.target.value)}
            >
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
            </select>
            </div>
        </div>
    );
}