import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHelpers";
import { empTableHeaders, defaultSearchParams } from "./constants";
import {
    StyledManageEmployeesWrap,
    StyledEmployeesTable,
} from "./ManageEmployees.style";
import {
    Modal,
    Pagination,
    EmployeesTableFilter,
    LinkButton,
    Loader,
    EmployeeDeleteModal,
} from "../../components";
import { getEmployeesListingData } from "../../utils";
import {
    fetchEmployees,
    deleteEmployeeAction,
} from "../../core/store/employeesList/actions";
import { selectRequestInProgress } from "../../core/store/requests/reducer";
import { REQUESTS_ENUM } from "../../core/store/requests/requestsEnum";
import { selectEmployeesListSlice } from "../../core/store/employeesList/reducer";
import ToggleView from "../../components/ToggleView/ToggleView";
import EmployeeGrid from "../../components/EmployeeGrid/EmployeeGrid";
import { ISearchParams } from "../../interfaces/common";

const ManageEmployees = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const [isModalopen, setIsModalOpen] = useState(false);
    const [empIdToDelete, setEmpIdToDelete] = useState<number | undefined>(
        undefined
    );

    const [toggleGridView, setToggleGridView] = useState(true); // False => Table View :: True => Grid/Card View
    const offset =
        Number(searchParams.get("offset")) || defaultSearchParams.offset;
    const limit =
        Number(searchParams.get("limit")) || defaultSearchParams.limit;

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

    const getSearchParams = (): ISearchParams => {
        const sortBy = searchParams.get("sortBy") || defaultSearchParams.sortBy;
        const sortDir =
            searchParams.get("sortDir") || defaultSearchParams.sortDir;
        const skillIds =
            searchParams.get("skillIds") || defaultSearchParams.skillIds;
        const search = searchParams.get("search") || defaultSearchParams.search;

        return { limit, offset, sortBy, sortDir, skillIds, search };
    };

    const deleteConfirmHandler = () => {
        setIsModalOpen(false);
        if (empIdToDelete) {
            dispatch(deleteEmployeeAction(empIdToDelete));
        }
    };

    useEffect(() => {
        dispatch(fetchEmployees(getSearchParams()));
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
                                <span className="material-symbols-rounded">
                                    person_add
                                </span>
                            </LinkButton>
                        </div>
                        <div className="employees-view">
                            <ToggleView
                                gridView={toggleGridView}
                                handleToggleGridView={() => {
                                    setToggleGridView((prev) => !prev);
                                }}
                            />
                        </div>

                        {toggleGridView ? (
                            <EmployeeGrid
                                setIsModalOpen={setIsModalOpen}
                                setDeleteEmployee={setEmpIdToDelete}
                            />
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
