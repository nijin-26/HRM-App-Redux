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

const Sort = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [sort, setSort] = useState<SingleValue<IReactSelectOption>>(null);

    useEffect(() => {
        const urlSortValue = searchParams.get("sortBy");
        urlSortValue
            ? setSort(getObjectFromValue(urlSortValue, sortOptions))
            : setSort(
                  getObjectFromValue(defaultSearchParams.sortBy, sortOptions)
              );
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

    const getCurrentSortDirection = () => {
        const sortDirection = searchParams.get("sortDir");
        if (sortDirection === "asc") return "arrow_upward";
        else return "arrow_downward";
    };

    const handleSortDirectionChange = () => {
        dispatch(employeeListClear());
        searchParams.set("offset", "0");
        const sortDirection = searchParams.get("sortDir");
        if (sortDirection === "asc") searchParams.set("sortDir", "desc");
        else searchParams.set("sortDir", "asc");
        setSearchParams(searchParams);
    };

    return (
        <SortContainer>
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
                    {getCurrentSortDirection()}
                </span>
            </div>
        </SortContainer>
    );
};

export default Sort;
