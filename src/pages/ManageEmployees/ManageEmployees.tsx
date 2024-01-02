import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import { empTableHeaders, defaultQueryParams } from './constants';
import {
    StyledManageEmployeesWrap,
    StyledEmployeesTable,
} from './ManageEmployees.style';
import {
    Modal,
    Pagination,
    EmployeesTableFilter,
    LinkButton,
    Loader,
    EmployeeDeleteModal,
} from '../../components';
import { IQueryParams } from '../../interfaces/common';
import { getEmployeesListingData } from '../../utils';
import {
    fetchEmployees,
    deleteEmployeeAction,
} from '../../core/store/employeesList/actions';
import { selectRequestInProgress } from '../../core/store/requests/reducer';
import { selectEmployeesListSlice } from '../../core/store/employeesList/reducer';
import { REQUESTS_ENUM } from '../../core/store/requests/requestsEnum';

const ManageEmployees: React.FC = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const [isModalopen, setIsModalOpen] = useState(false);
    const [empIdToDelete, setEmpIdToDelete] = useState<number | undefined>(
        undefined
    );

    const offset =
        Number(searchParams.get('offset')) || defaultQueryParams.offset;
    const limit = Number(searchParams.get('limit')) || defaultQueryParams.limit;

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
        const limit = searchParams.get('limit')
            ? Number(searchParams.get('limit'))
            : defaultQueryParams.limit;
        const offset = searchParams.get('offset')
            ? Number(searchParams.get('offset'))
            : defaultQueryParams.offset;
        const sortBy = searchParams.get('sortBy') ?? defaultQueryParams.sortBy;
        const sortDir =
            searchParams.get('sortDir') ?? defaultQueryParams.sortDir;
        const skillIds = searchParams.get('skillIds');
        const search = searchParams.get('search');

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
