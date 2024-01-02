import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHelpers";
import { initQueryParams } from "../../pages/ManageEmployees/constants";
import { GridContainer } from "./EmployeeGrid.styles";
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
  const [offset, setOffset] = useState(0);

  const observerTarget = useRef(null);
  const [searchParams] = useSearchParams();

  const employeeList = useAppSelector((state) => state.employees.employeesList);
  const employeesCount = useAppSelector((state) => state.employees.count);
  const dispatch = useAppDispatch();

  let limit = 10;

  const employeesFetchLoading = useAppSelector(
    selectRequestInProgress(REQUESTS_ENUM.getEmployeesList)
  );

  const getSearchParams = (): IQueryParams => {
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
    dispatch(fetchEmployees(getSearchParams()));
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    const { current } = observerTarget;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        if (entries[0].isIntersecting) {
          handleLoadData();
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.5, // Trigger when 50% of the element is visible
    });

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [employeesFetchLoading]);

  return (
    <>
      <GridContainer>
        {employeeList.length
          ? getEmployeesListingData(employeeList).map((employee) => (
              <EmployeeCard
                key={employee.id}
                employeeData={employee}
                setIsModalOpen={setIsModalOpen}
                setDeleteEmployee={setDeleteEmployee}
              />
            ))
          : null}
      </GridContainer>
      {employeesFetchLoading && <Loader />}
      <div ref={observerTarget}></div>
    </>
  );
};

export default EmployeeGrid;
