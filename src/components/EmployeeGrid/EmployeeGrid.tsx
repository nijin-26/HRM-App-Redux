import { useAppSelector } from "../../hooks/storeHelpers";
import { GridContainer, NotFoundText } from "./EmployeeGrid.styles";
import { getEmployeesListingData } from "../../utils";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { selectRequestInProgress } from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { IApiEmployee } from "../../interfaces/ApiDataInterface";
import { useEffect, useRef } from "react";
import { Loader } from "..";
import { useSearchParams } from "react-router-dom";
import { initQueryParams } from "../../pages/ManageEmployees/constants";

const EmployeeGrid = ({
  employeeList,
  setIsModalOpen,
  setDeleteEmployee,
}: {
  employeeList: IApiEmployee[];
  setIsModalOpen: (isOpen: boolean) => void;
  setDeleteEmployee: (deleteEmployeeId: number) => void;
}) => {
  const observerTarget = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const employeesFetchLoading = useAppSelector(
    selectRequestInProgress(REQUESTS_ENUM.getEmployeesList)
  );
  const employeesCount = useAppSelector((state) => state.employees.count);

  let limit = Number(searchParams.get("limit")) || initQueryParams.limit;

  const handleLoadData = () => {
    let hasMore = true;

    if (employeesCount === undefined) hasMore = true;
    else if (
      (employeeList && employeeList.length >= employeesCount) ||
      employeesCount === 0
    ) {
      hasMore = false;
    }

    console.log(
      employeesFetchLoading,
      !hasMore,
      "Employee GRID loading, has more false"
    );
    if (employeesFetchLoading || !hasMore) return;
    console.log("After condition checkj");
    const nextOffset = Number(searchParams.get("offset")) ?? 0;
    searchParams.set("offset", String(nextOffset + limit));
    setSearchParams(searchParams);
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
      {employeeList?.length ? (
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
      ) : !employeesFetchLoading ? (
        <NotFoundText>Record not Found</NotFoundText>
      ) : null}

      {employeesFetchLoading && <Loader />}
      <div ref={observerTarget}></div>
    </>
  );
};

export default EmployeeGrid;
