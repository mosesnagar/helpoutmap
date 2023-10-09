const Filter = ({ label, paramName, isChecked, onCheckboxChange }) => {
    return (
        <div>
            <label>
                <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
                {label}
            </label>
        </div>
    );
};

export default Filter;