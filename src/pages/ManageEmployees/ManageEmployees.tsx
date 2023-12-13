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
import { toast } from 'react-toastify';
import { useAppContext } from '../../core/contexts/AppContext';
import { API } from '../../core/api/useApi';
import {
    IEmployeeListing,
    IDeleteEmployee,
    IQueryParams,
} from '../../interfaces/common';
import { getEmployeesListingData } from '../../utils';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../core/store/employees/actions';
import { IState } from '../../core/store';

const ManageEmployees: React.FC = () => {
    const { appState } = useAppContext();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const [isModalopen, setIsModalOpen] = useState(false);
    const [deleteEmployee, setDeleteEmployee] = useState<IDeleteEmployee>({
        isDeleting: false,
        empIdToDelete: undefined,
    });

    const employeesList = useSelector(
        (state: IState) => state.employees.employeesList
    );
    const employeesFetchLoading = useSelector(
        (state: IState) => state.employees.loading
    );
    const employeesCount = useSelector(
        (state: IState) => state.employees.count
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

    const deleteConfirmHandler = async () => {
        setDeleteEmployee({
            isDeleting: true,
            empIdToDelete: deleteEmployee.empIdToDelete,
        });
        setIsModalOpen(false);
        try {
            await API({
                method: 'DELETE',
                url: `/employee/${deleteEmployee.empIdToDelete}`,
            });
            toast.success('Employee deleted Successfully');
            // refreshEmployeesList();
        } catch (error) {
            toast.error('Employee deletion failed');
            console.log('delete Failed!', error);
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
                                              setDeleteEmployee
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
                            employeeIdToDelete={deleteEmployee.empIdToDelete}
                        />
                    </Modal>
                </>
            )}
        </>
    );
};

export default ManageEmployees;
