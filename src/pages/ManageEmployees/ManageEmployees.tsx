import { useState, useEffect } from "react";
import { empTableHeaders, initQueryParams } from "./constants";
import {
  StyledManageEmployeesWrap,
  StyledEmployeesTable,
} from "./ManageEmployees.style";
import { useSearchParams } from "react-router-dom";
import {
  Modal,
  Pagination,
  EmployeesTableFilter,
  LinkButton,
  Loader,
} from "../../components";
import { toast } from "react-toastify";
import { useAppContext } from "../../core/contexts/AppContext";
import useApi, { API } from "../../core/api/useApi";
import { IApiFetchEmployeesArray } from "../../interfaces/ApiDataInterface";
import { IEmployeeListing, IDeleteEmployee } from "../../interfaces/common";
import { getEmployeesListingData } from "../../utils";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";

const ManageEmployees: React.FC = () => {
  const { appState } = useAppContext();
  const [searchParams] = useSearchParams();

  const [isModalopen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<IEmployeeListing[]>([]);
  const [deleteEmployee, setDeleteEmployee] = useState<IDeleteEmployee>({
    isDeleting: false,
    empIdToDelete: undefined,
  });

  const getFetchURL = () => {
    const limit = searchParams.get("limit") ?? initQueryParams.limit;
    const offset = searchParams.get("offset") ?? initQueryParams.offset;
    const sortBy = searchParams.get("sortBy") ?? initQueryParams.sortBy;
    const sortDir = searchParams.get("sortDir") ?? initQueryParams.sortDir;
    return `/employee?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortDir=${sortDir}`;
  };

  const deleteConfirmHandler = async () => {
    setDeleteEmployee({
      isDeleting: true,
      empIdToDelete: deleteEmployee.empIdToDelete,
    });
    setIsModalOpen(false);
    try {
      await API({
        method: "DELETE",
        url: `/employee/${deleteEmployee.empIdToDelete}`,
      });
      toast.success("Employee Added Successfully");
      refreshEmployeesList();
    } catch (error) {
      toast.error("Employee deletion failed");
      console.log("delete Failed!", error);
    } finally {
      setDeleteEmployee({
        isDeleting: false,
        empIdToDelete: undefined,
      });
    }
  };

  const filterEmployeesList = (employeesList: IEmployeeListing[]) => {
    return employeesList.filter((employee) => {
      let shouldInclude = true;

      const employeeName = employee.fullName.trim().toLowerCase();
      const selectedSkillsForFilter = appState.skillsFilter.map((skill) =>
        Number(skill.value)
      );
      if (!(employeeName.indexOf(appState.employeeNameFilter) > -1)) {
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
      setEmployees(
        getEmployeesListingData(
          EmployeesData,
          setIsModalOpen,
          setDeleteEmployee
        )
      );
    }
  }, [loading]);

  return (
    <>
      {deleteEmployee.isDeleting ? (
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
            <div
              style={{
                margin: "0 auto",
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {filterEmployeesList(employees)?.map((employee) => (
                <EmployeeCard
                  employeeData={employee}
                  setIsModalOpen={setIsModalOpen}
                  setDeleteEmployee={setDeleteEmployee}
                />
              ))}
            </div>
            <StyledEmployeesTable
              tableHeaders={empTableHeaders}
              tableData={employees.length ? filterEmployeesList(employees) : []}
              loading={loading}
            />
            {employeesList && !isSearchFilters() ? (
              <Pagination
                totalEntries={employeesList.data.count}
                key={searchParams.get("offset")}
              />
            ) : null}
          </StyledManageEmployeesWrap>

          <Modal
            $isOpen={isModalopen}
            text="Are you sure you want to permanently delete the employee
                    record?"
            type="yesCancel"
            confirmClickHandler={deleteConfirmHandler}
            cancelClickHandler={() => setIsModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default ManageEmployees;
