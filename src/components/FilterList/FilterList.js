import Filter from "@components/Filter";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// FilterList component
const FilterList = ({ filterOptions }) => {
    const router = useRouter();

    const [filterState, setFilterState] = useState({});

    const handleCheckboxChange = (paramName) => {
        const queryParams = { ...router.query };
        queryParams[paramName] = queryParams[paramName] === "1" ? "0" : "1";
        router.push({ pathname: router.pathname, query: queryParams });
    };

    useEffect(() => {
        // Initialize filter state from URL query parameters
        const initialFilterState = {};
        filterOptions?.forEach((option) => {
            initialFilterState[option] = router.query[option] === "1";
        });
        setFilterState(initialFilterState);
    }, [filterOptions, router.query]);

    return (
        <div>
            <h2>Filters</h2>
            {filterOptions?.map((option) => (
                <Filter
                    key={option}
                    label={option}
                    paramName={option}
                    isChecked={filterState[option]}
                    onCheckboxChange={() => handleCheckboxChange(option)}
                />
            ))}
        </div>
    );
};

export default FilterList;
