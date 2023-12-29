import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHelpers";
import { empTableHeaders, initQueryParams } from "./constants";
import {
  StyledManageEmployeesWrap,
  StyledEmployeesTable,
} from "./ManageEmployees.style";
import { GridContainer } from "./ManageEmployees.style";
import {
  Modal,
  Pagination,
  EmployeesTableFilter,
  LinkButton,
  Loader,
  EmployeeDeleteModal,
} from "../../components";
import { IQueryParams } from "../../interfaces/common";
import { getEmployeesListingData } from "../../utils";
import {
  fetchEmployees,
  deleteEmployeeAction,
} from "../../core/store/employeesList/actions";
import { selectRequestInProgress } from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { selectEmployeesListSlice } from "../../core/store/employeesList/reducer";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import ToggleView from "../../components/ToggleView/ToggleView";

const ManageEmployees = () => {
  const observerTarget = useRef(null);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [isModalopen, setIsModalOpen] = useState(false);
  const [empIdToDelete, setEmpIdToDelete] = useState<number | undefined>(
    undefined
  );

  // const [offset, setOffset] = useState(0);
  const [toggleGridView, setToggleGridView] = useState(false); // False => Table View :: True => Grid/Card View

  let offset = Number(searchParams.get("offset")) || initQueryParams.offset;
  let limit = Number(searchParams.get("limit")) || initQueryParams.limit;

  const employeesListSlice = useAppSelector(
    selectEmployeesListSlice(offset, limit)
  );
  const employeesCount = useAppSelector((state) => state.employees.count);
  const employeesFetchLoading = useAppSelector(
    selectRequestInProgress(REQUESTS_ENUM.getEmployeesList)
  );
  const employeeDeleteLoading = useAppSelector(
    selectRequestInProgress(REQUESTS_ENUM.deleteEmployee)
  );

  const getSearchParams = (): IQueryParams => {
    if (!toggleGridView) {
      limit = searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : initQueryParams.limit;
      offset = searchParams.get("offset")
        ? Number(searchParams.get("offset"))
        : initQueryParams.offset;
    }
    const sortBy = searchParams.get("sortBy") ?? initQueryParams.sortBy;
    const sortDir = searchParams.get("sortDir") ?? initQueryParams.sortDir;
    const skillIds = searchParams.get("skillIds");
    const search = searchParams.get("search");
    return {
      limit,
      // offset: toggleGridView ? offset : dynamicOffset,
      offset,
      sortBy,
      sortDir,
      skillIds,
      search,
    };
  };

  const deleteConfirmHandler = () => {
    setIsModalOpen(false);
    if (empIdToDelete) {
      dispatch(deleteEmployeeAction(empIdToDelete));
    }
  };
  const handleLoadData = () => {
    let hasMore = true;

    if (employeesCount === undefined) hasMore = true;
    else if (
      (employeesListSlice && employeesListSlice.length >= employeesCount) ||
      employeesCount === 0
    ) {
      hasMore = false;
    }

    if (employeesFetchLoading || !hasMore) return;
    dispatch<any>(fetchEmployees(getSearchParams()));
    // setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    const { current } = observerTarget;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleLoadData();
          }
        });
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.1, // Trigger when 10% of the element is visible
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

  useEffect(() => {
    dispatch<any>(fetchEmployees(getSearchParams()));
  }, [searchParams]);

  return (
    <>
      {employeeDeleteLoading ? (
        <Loader className="full-screen-loader" />
      ) : (
        <>
          <StyledManageEmployeesWrap>
            <div className="employees-table-controls">
              <EmployeesTableFilter />
              <LinkButton
                to="/add-employee"
                className="primary icon-btn table-control-field"
              >
                <span>Add Employee</span>
                <span className="material-symbols-rounded">person_add</span>
              </LinkButton>
            </div>
            <div className="employees-view">
              <ToggleView
                gridView={toggleGridView}
                handleToggleGridView={() => {
                  setToggleGridView((prev) => !prev);
                  // setOffset(0);
                }}
              />
            </div>

            {toggleGridView ? (
              <>
                <GridContainer>
                  {employeesListSlice.length &&
                    getEmployeesListingData(
                      employeesListSlice,
                      setIsModalOpen,
                      setEmpIdToDelete
                    )?.map((employee) => (
                      <EmployeeCard
                        key={employee.id}
                        employeeData={employee}
                        setIsModalOpen={setIsModalOpen}
                        setDeleteEmployee={setEmpIdToDelete}
                      />
                    ))}
                </GridContainer>
                {employeesFetchLoading && <Loader />}
                <div ref={observerTarget}></div>
              </>
            ) : (
              <>
                <StyledEmployeesTable
                  tableHeaders={empTableHeaders}
                  tableData={
                    employeesListSlice.length
                      ? getEmployeesListingData(
                          employeesListSlice,
                          setIsModalOpen,
                          setEmpIdToDelete
                        )
                      : []
                  }
                  loading={employeesFetchLoading}
                />
                {employeesCount && employeesCount > limit ? (
                  <Pagination
                    totalEntries={employeesCount}
                    key={searchParams.get("offset")}
                  />
                ) : null}
              </>
            )}
          </StyledManageEmployeesWrap>

          <Modal
            $isOpen={isModalopen}
            cancelClickHandler={() => setIsModalOpen(false)}
          >
            <EmployeeDeleteModal
              confirmClickHandler={deleteConfirmHandler}
              cancelClickHandler={() => setIsModalOpen(false)}
              employeeIdToDelete={empIdToDelete}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default ManageEmployees;
