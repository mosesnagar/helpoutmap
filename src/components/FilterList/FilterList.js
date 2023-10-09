import Filter from "@components/Filter";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FilterList = ({ filterOptions, ...props }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeFilters, setActiveFilters] = useState([]);

    useEffect(() => {
        const optionSearchParams = new URLSearchParams(searchParams.toString());
        const tags = optionSearchParams.get("tags")?.split(",");
        setActiveFilters(tags);
    }, [searchParams]);

    const handleCheckboxChange = (option, isActive) => {
        let url;
        url = isActive
            ? `/?tags=${(activeFilters ?? []).filter((filter) => filter !== option).join(",")}`
            : `/?tags=${(activeFilters ?? []).join(",")},${option}`;

        router.push(url, undefined, { shallow: true });
    };

    return (
        <div {...props}>
            <h2>סינון</h2>
            {filterOptions?.map((option) => {
                const isActive = activeFilters?.includes(option);

                return (
                    <Filter
                        key={option}
                        label={option}
                        paramName={option}
                        isChecked={isActive}
                        onCheckboxChange={() => handleCheckboxChange(option, isActive)}
                    />
                );
            })}
        </div>
    );
};

export default FilterList;
