import { useState, useEffect, useRef } from "react";
import { empTableHeaders, initQueryParams } from "./constants";
import {
  StyledManageEmployeesWrap,
  StyledEmployeesTable,
  GridContainer,
} from "./ManageEmployees.style";
import { useSearchParams } from "react-router-dom";
import {
    Modal,
    Pagination,
    EmployeesTableFilter,
    LinkButton,
    Loader,
    EmployeeDeleteModal,
} from '../../components';
import { IEmployeeListing, IQueryParams } from '../../interfaces/common';
import { getEmployeesListingData } from '../../utils';

import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEmployees,
    deleteEmployeeAction,
} from '../../core/store/employees/actions';
import { IState } from '../../core/store';

const ManageEmployees: React.FC = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const [isModalopen, setIsModalOpen] = useState(false);
    const [empIdToDelete, setEmpIdToDelete] = useState<number | undefined>(
        undefined
    );

    const employeesList = useSelector(
        (state: IState) => state.employees.employeesList
    );
    const employeesFetchLoading = useSelector(
        (state: IState) => state.employees.employeesFetchloading
    );
    const employeesCount = useSelector(
        (state: IState) => state.employees.count
    );
    const employeeDeleteLoading = useSelector(
        (state: IState) => state.employees.employeeDeleteLoading
    );
    const employeeNameFilter = useSelector(
        (state: IState) =>
            state.employees.employeesListFilter.employeeNameFilter
    );
    const employeeSkillsFilter = useSelector(
        (state: IState) =>
            state.employees.employeesListFilter.employeeSkillsFilter
    );

    useEffect(() => {
        dispatch<any>(fetchEmployees(getSearchParams()));
    }, [searchParams]);
  const [isModalopen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<IEmployeeListing[]>([]);
  const [deleteEmployee, setDeleteEmployee] = useState<IDeleteEmployee>({
    isDeleting: false,
    empIdToDelete: undefined,
  });

  const observerTarget = useRef(null);

  const limit = 10;
  let offset = 0;

  const getFetchURL = () => {
    // const limit = searchParams.get("limit") ?? initQueryParams.limit;
    // const offset = searchParams.get("offset") ?? initQueryParams.offset;
    const sortBy = searchParams.get("sortBy") ?? initQueryParams.sortBy;
    const sortDir = searchParams.get("sortDir") ?? initQueryParams.sortDir;
    return `/employee?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}`;
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

    const isSearchFilters = () => {
        if (employeeNameFilter === '' && employeeSkillsFilter.length === 0) {
            return false;
        }
        return true;
    };
  const isSearchFilters = () => {
    if (
      appState.employeeNameFilter === "" &&
      appState.skillsFilter.length === 0
    ) {
      return false;
    }
    return true;
  };

  const {
    response: employeesList,
    loading,
    refresh: refreshEmployeesList,
    fetchData,
    error: fetchError,
  } = useApi<IApiFetchEmployeesArray>("GET", getFetchURL());

  useEffect(() => {
    if (fetchError) {
      toast.error(
        "Could not fetch employees List. Please try reloading the page."
      );
    }

    if (employeesList) {
      const EmployeesData = employeesList.data.employees;
      const formattedData = getEmployeesListingData(
        EmployeesData,
        setIsModalOpen,
        setDeleteEmployee
      );
      setEmployees((prev) => [...prev, ...formattedData]);
    }
  }, [loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          offset = offset + limit;
          fetchData(getFetchURL());
          // refreshEmployeesList();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

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
                                <span className="material-symbols-rounded">
                                    person_add
                                </span>
                            </LinkButton>
                        </div>
                        <StyledEmployeesTable
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
                                key={searchParams.get('offset')}
                            />
                        ) : null}
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
