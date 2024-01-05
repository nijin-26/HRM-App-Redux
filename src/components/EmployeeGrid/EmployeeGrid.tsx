import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHelpers";
import { initQueryParams } from "../../pages/ManageEmployees/constants";
import { GridContainer, NotFoundText } from "./EmployeeGrid.styles";
import { getEmployeesListingData } from "../../utils";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { selectRequestInProgress } from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { Loader } from "..";
import { useEffect, useRef, useState } from "react";
import { fetchEmployees } from "../../core/store/employeesList/actions";
import { IQueryParams } from "../../interfaces/common";

const EmployeeGrid = ({
  setIsModalOpen,
  setDeleteEmployee,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
  setDeleteEmployee: (deleteEmployeeId: number) => void;
}) => {
  const observerTarget = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const employeeList = useAppSelector((state) => state.employees.employeesList);
  const employeesCount = useAppSelector((state) => state.employees.count);
  const dispatch = useAppDispatch();

  const employeesFetchLoading = useAppSelector(
    selectRequestInProgress(REQUESTS_ENUM.getEmployeesList)
  );

  const getSearchParams = (): IQueryParams => {
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : initQueryParams.limit;
    const offset = searchParams.get("offset")
      ? Number(searchParams.get("offset"))
      : initQueryParams.offset;

    const sortBy = searchParams.get("sortBy") ?? initQueryParams.sortBy;
    const sortDir = searchParams.get("sortDir") ?? initQueryParams.sortDir;
    const skillIds = searchParams.get("skillIds");
    const search = searchParams.get("search");
    return {
      limit,
      offset,
      sortBy,
      sortDir,
      skillIds,
      search,
    };
  };

  const handleLoadData = () => {
    let hasMore = true;

    if (employeesCount === undefined) hasMore = true;
    else if (
      (employeeList && employeeList.length >= employeesCount) ||
      employeesCount === 0
    ) {
      hasMore = false;
    }
    if (employeesFetchLoading || !hasMore) return;

    const limit = Number(searchParams.get("limit")) || initQueryParams.limit;
    const nextOffset = Number(searchParams.get("offset")) ?? 0;
    searchParams.set("offset", String(nextOffset + limit));
    setSearchParams(searchParams);
    dispatch(fetchEmployees(getSearchParams()));
  };

  useEffect(() => {
    const { current } = observerTarget;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) handleLoadData();
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 1, // Trigger when 50% of the element is visible
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleLoadData]);

  return (
    <>
      {employeeList.length ? (
        <GridContainer>
          {getEmployeesListingData(employeeList).map((employee) => (
            <EmployeeCard
              key={employee.id}
              employeeData={employee}
              setIsModalOpen={setIsModalOpen}
              setDeleteEmployee={setDeleteEmployee}
            />
          ))}
        </GridContainer>
      ) : (
        <NotFoundText>Record not Found</NotFoundText>
      )}

      {employeesFetchLoading && <Loader />}
      <div ref={observerTarget}></div>
    </>
  );
};

export default EmployeeGrid;
