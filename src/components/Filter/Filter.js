import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Filter component
const Filter = ({ label, paramName }) => {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        const queryParams = { ...router.query };

        if (isChecked) {
            delete queryParams[paramName];
        } else {
            queryParams[paramName] = "1";
        }

        router.push({ pathname: router.pathname, query: queryParams });
    };

    useEffect(() => {
        // Check the checkbox if the corresponding query param is present
        setIsChecked(router.query[paramName] === "1");
    }, [router.query[paramName]]);

    return (
        <div>
            <label>
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                {label}
            </label>
        </div>
    );
};

export default Filter;