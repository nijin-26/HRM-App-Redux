import { useState, useEffect } from 'react';
import { empTableHeaders, initQueryParams } from './constants';
import {
    StyledManageEmployeesWrap,
    StyledEmployeesTable,
} from './ManageEmployees.style';
import { useSearchParams } from 'react-router-dom';
import {
    Modal,
    Pagination,
    EmployeesTableFilter,
    LinkButton,
    Loader,
    EmployeeDeleteModal,
} from '../../components';
import { useAppContext } from '../../core/contexts/AppContext';
import { IEmployeeListing, IQueryParams } from '../../interfaces/common';
import { getEmployeesListingData } from '../../utils';

import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEmployees,
    deleteEmployeeAction,
} from '../../core/store/employees/actions';
import { IState } from '../../core/store';

const ManageEmployees: React.FC = () => {
    const { appState } = useAppContext();
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

    useEffect(() => {
        dispatch<any>(fetchEmployees(getSearchParams()));
    }, [searchParams]);

    const getSearchParams = (): IQueryParams => {
        const limit = searchParams.get('limit')
            ? Number(searchParams.get('limit'))
            : initQueryParams.limit;
        const offset = searchParams.get('offset')
            ? Number(searchParams.get('offset'))
            : initQueryParams.offset;
        const sortBy = searchParams.get('sortBy') ?? initQueryParams.sortBy;
        const sortDir = searchParams.get('sortDir') ?? initQueryParams.sortDir;

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
            const selectedSkillsForFilter = appState.skillsFilter.map((skill) =>
                Number(skill.value)
            );
            if (!(employeeName.indexOf(appState.employeeNameFilter) > -1)) {
                shouldInclude = false;
            }

            if (
                !selectedSkillsForFilter.every((skill) =>
                    employee['skills'].includes(skill)
                )
            ) {
                shouldInclude = false;
            }

            return shouldInclude;
        });
    };

    const isSearchFilters = () => {
        if (
            appState.employeeNameFilter === '' &&
            appState.skillsFilter.length === 0
        ) {
            return false;
        }
        return true;
    };

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
