import { useAppSelector } from "../../hooks/storeHelpers";
import { GridContainer } from "./EmployeeGrid.styles";
import { getEmployeesListingData } from "../../utils";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { selectRequestInProgress } from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { IApiEmployee } from "../../interfaces/ApiDataInterface";
import { useEffect, useRef } from "react";
import { Loader, NoResultsMessage } from "..";
import { useSearchParams } from "react-router-dom";
import { defaultSearchParams } from "../../pages/ManageEmployees/constants";
import { TEmpDelete } from "../../pages/ManageEmployees/ManageEmployees";

const EmployeeGrid = ({
    employeeList,
    employeesCount,
    setIsModalOpen,
    setDeleteEmployee,
}: {
    employeeList: IApiEmployee[];
    employeesCount: number | undefined;
    setIsModalOpen: (isOpen: boolean) => void;
    setDeleteEmployee: (empData: TEmpDelete) => void;
}) => {
    const observerTarget = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const employeesFetchLoading = useAppSelector(
        selectRequestInProgress(REQUESTS_ENUM.getEmployeesList)
    );

    let limit = Number(searchParams.get("limit")) || defaultSearchParams.limit;

    const handleLoadData = () => {
        let currentOffset = Number(searchParams.get("offset"));

        if (
            employeesFetchLoading ||
            !employeesCount ||
            typeof currentOffset !== "number"
        )
            return;

        let hasMore = true;

        if (
            (employeeList && employeeList.length >= employeesCount) ||
            employeesCount === 0
        )
            hasMore = false;

        if (!hasMore) return;

        const maxOffset = Math.max(
            0,
            Math.floor(employeesCount! / limit) * limit
        ); // (28 / 10) * 10 = 28
        const newOffset = Math.min(currentOffset + limit, maxOffset);

        if (newOffset > maxOffset || newOffset <= currentOffset) return;

        searchParams.set("offset", String(newOffset));
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

    useEffect(() => {
        searchParams.set("offset", "0");
        setSearchParams(searchParams);
    }, []);

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
                <NoResultsMessage />
            ) : null}

            {employeesFetchLoading && <Loader />}
            <div ref={observerTarget}></div>
        </>
    );
};

export default EmployeeGrid;
