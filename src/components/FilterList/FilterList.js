import Filter from "@components/Filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "../../utils";

const FilterList = ({ filterOptions }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div>
            <h2>Filters</h2>
            {filterOptions?.map((option) => {
                const optionNameLowerCase = option.toLowerCase();
                const optionSearchParams = new URLSearchParams(searchParams.toString());
                optionSearchParams.set(optionNameLowerCase, option);
                const optionUrl = createUrl(pathname, optionSearchParams);
                const isActive = searchParams.get(optionNameLowerCase) === option;

                return (
                    <Filter
                        key={option}
                        label={option}
                        paramName={option}
                        isChecked={isActive}
                        onCheckboxChange={() => router.replace(optionUrl, { scroll: false })}
                    />
                );
            })}
        </div>
    );
};

export default FilterList;
