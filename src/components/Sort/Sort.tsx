import { useSearchParams } from "react-router-dom";
import { CustomSelectStyles } from "../EmployeesTableFilter/EmployeesTableFilter.style";
import { SortContainer } from "./Sort.styles";
import Select, { SingleValue } from "react-select";
import { useState } from "react";
import { IReactSelectOption } from "../../interfaces/common";

const Sort = () => {
  const [sort, setSort] = useState<SingleValue<IReactSelectOption>>({
    label: "ID",
    value: "id",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions: IReactSelectOption[] = [
    { value: "id", label: "ID" },
    { value: "firstName", label: "Name" },
    { value: "email", label: "Email" },
  ];

  const handleSortChange = (option: SingleValue<IReactSelectOption>) => {
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
    const sortDirection = searchParams.get("sortDir");
    if (sortDirection === "asc") searchParams.set("sortDir", "desc");
    else searchParams.set("sortDir", "asc");
    setSearchParams(searchParams);
  };

  return (
    <SortContainer>
      <Select
        styles={CustomSelectStyles}
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
