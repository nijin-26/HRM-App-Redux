import { useState, useEffect, useRef } from "react";
import { empTableHeaders, initQueryParams } from "./constants";
import {
  StyledManageEmployeesWrap,
  StyledEmployeesTable,
} from "./ManageEmployees.style";
import { useSearchParams } from "react-router-dom";
import { GridContainer } from "./ManageEmployees.style";
import {
  Modal,
  Pagination,
  EmployeesTableFilter,
  LinkButton,
  Loader,
  EmployeeDeleteModal,
} from "../../components";
import { IEmployeeListing, IQueryParams } from "../../interfaces/common";
import { getEmployeesListingData } from "../../utils";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  deleteEmployeeAction,
} from "../../core/store/employeesList/actions";
import { IState } from "../../core/store";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";

const ManageEmployees = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const isInitialRender = useRef(0);

  const [isModalopen, setIsModalOpen] = useState(false);
  const [empIdToDelete, setEmpIdToDelete] = useState<number | undefined>(
    undefined
  );
  const [offset, setOffset] = useState(0);

  const employeesList = useSelector(
    (state: IState) => state.employees.employeesList
  );
  const employeesFetchLoading = useSelector(
    (state: IState) => state.employees.employeesFetchloading
  );
  const employeesCount = useSelector((state: IState) => state.employees.count);

  const employeeDeleteLoading = useSelector(
    (state: IState) => state.employees.employeeDeleteLoading
  );
  const employeeNameFilter = useSelector(
    (state: IState) => state.employees.employeesListFilter.employeeNameFilter
  );
  const employeeSkillsFilter = useSelector(
    (state: IState) => state.employees.employeesListFilter.employeeSkillsFilter
  );

  let hasMore = employeesList.length < employeesCount;

  // useEffect(() => {
  //   dispatch<any>(fetchEmployees(getSearchParams()));
  // }, [searchParams, offset]);

  const observerTarget = useRef(null);
  const limit = 10;

  const getSearchParams = (): IQueryParams => {
    // const limit = searchParams.get("limit")
    //   ? Number(searchParams.get("limit"))
    //   : initQueryParams.limit;
    // const offset = searchParams.get("offset")
    //   ? Number(searchParams.get("offset"))
    //   : initQueryParams.offset;
    const sortBy = searchParams.get("sortBy") ?? initQueryParams.sortBy;
    const sortDir = searchParams.get("sortDir") ?? initQueryParams.sortDir;
    // console.log("get search params is called", limit, offset);
    return { limit, offset, sortBy, sortDir };
  };

  const deleteConfirmHandler = () => {
    setIsModalOpen(false);
    if (empIdToDelete) {
      dispatch<any>(deleteEmployeeAction(empIdToDelete));
    }
  };

  const filterEmployeesList = (employeesList: IEmployeeListing[]) => {
    return employeesList.filter((employee) => {
      let shouldInclude = true;

      const employeeName = employee.fullName.trim().toLowerCase();
      const selectedSkillsForFilter = employeeSkillsFilter.map((skill) =>
        Number(skill.value)
      );
      if (!(employeeName.indexOf(employeeNameFilter) > -1)) {
        shouldInclude = false;
      }

      if (
        !selectedSkillsForFilter.every((skill) =>
          employee["skills"].includes(skill)
        )
      ) {
        shouldInclude = false;
      }

      return shouldInclude;
    });
  };

  // Pagination Condition
  // const isSearchFilters = () => {
  //   if (employeeNameFilter === "" && employeeSkillsFilter.length === 0) {
  //     return false;
  //   }
  //   return true;
  // };

  const handleLoadData = () => {
    if (employeesFetchLoading || hasMore) return;
    console.log("after has more");
    dispatch<any>(fetchEmployees(getSearchParams()));
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    const { current } = observerTarget;

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      console.log("handle intersectio is called");
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
  }, []);

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
            <GridContainer>
              {filterEmployeesList(
                getEmployeesListingData(
                  employeesList,
                  setIsModalOpen,
                  setEmpIdToDelete
                )
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

            {/* <StyledEmployeesTable
              tableHeaders={empTableHeaders}
              tableData={
                employeesList.length
                  ? filterEmployeesList(
                      getEmployeesListingData(
                        employeesList,
                        setIsModalOpen,
                        setEmpIdToDelete
                      )
                    )
                  : []
              }
              loading={employeesFetchLoading}
            />
            {employeesList && !isSearchFilters() ? (
              <Pagination
                totalEntries={employeesCount}
                key={searchParams.get("offset")}
              />
            ) : null} */}
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
