import { useSearchParams } from "react-router-dom";
import { CustomSingleSelectStyle } from "../EmployeesTableFilter/EmployeesTableFilter.style";
import { SortContainer } from "./Sort.styles";
import Select, { SingleValue } from "react-select";
import { useEffect, useState } from "react";
import { IReactSelectOption } from "../../interfaces/common";
import { useAppDispatch } from "../../hooks/storeHelpers";
import { employeeListClear } from "../../core/store/employeesList/actions";
import {
    defaultSearchParams,
    sortOptions,
} from "../../pages/ManageEmployees/constants";
import { getObjectFromValue } from "../../utils";
import { Tooltip } from "react-tooltip";

const Sort = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState<SingleValue<IReactSelectOption>>(null);

    useEffect(() => {
        const urlSortValue =
            searchParams.get("sortBy") || defaultSearchParams.sortBy;
        setSort(getObjectFromValue(urlSortValue, sortOptions));
    }, [searchParams.get("sortBy")]);

    const handleSortChange = (option: SingleValue<IReactSelectOption>) => {
        if (JSON.stringify(option) === JSON.stringify(sort)) {
            return;
        }

        dispatch(employeeListClear());
        setSort(option);
        searchParams.set("offset", "0");
        searchParams.set("sortBy", option?.value!);
        searchParams.set("sortDir", "asc");
        setSearchParams(searchParams);
    };

    const getCurrentSortDirection = () =>
        searchParams.get("sortDir") || defaultSearchParams.sortDir;

    const handleSortDirectionChange = () => {
        dispatch(employeeListClear());
        searchParams.set("offset", "0");
        getCurrentSortDirection() === "asc"
            ? searchParams.set("sortDir", "desc")
            : searchParams.set("sortDir", "asc");

        setSearchParams(searchParams);
    };

    return (
        <SortContainer>
            <Tooltip anchorSelect={".sort-icon"} noArrow place="right">
                {getCurrentSortDirection() === "asc"
                    ? "Ascending"
                    : "Desceding"}
            </Tooltip>
            <Select
                styles={CustomSingleSelectStyle}
                options={sortOptions}
                placeholder={"Sort By"}
                value={sort}
                isMulti={false}
                onChange={handleSortChange}
            />
            <div className="sort-icon">
                <span
                    className="material-symbols-rounded"
                    onClick={handleSortDirectionChange}
                >
                    {getCurrentSortDirection() === "asc"
                        ? "arrow_upward"
                        : "arrow_downward"}
                </span>
            </div>
        </SortContainer>
    );
};

export default Sort;
