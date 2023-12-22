import { useAppDispatch, useAppSelector } from '../../core/store';
import { Input, Button } from '..';
import Select, { MultiValue } from 'react-select';
import {
    CustomSelectStyles,
    StyledEmployeesFilterWrap,
} from './EmployeesTableFilter.style';
import { IReactSelectOption } from '../../interfaces/common';
import {
    employeeNameFilterChange,
    employeeSkillsFilterChange,
    employeeListFilterClear,
} from '../../core/store/employeesList/actions';

const EmployeesTableFilter: React.FC = () => {
    const dispatch = useAppDispatch();

    const selectSkillsData = useAppSelector(
        (state) => state.dropdownData.skills.skillsData
    );
    const selectEmployeeNameFilter = useAppSelector(
        (state) => state.employees.employeesListFilter.employeeNameFilter
    );
    const selectEmployeeSkillsFilter = useAppSelector(
        (state) => state.employees.employeesListFilter.employeeSkillsFilter
    );

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(
            employeeNameFilterChange(
                event.target.value.trimStart().toLowerCase()
            )
        );
    };

    return (
        <StyledEmployeesFilterWrap>
            <Input
                placeholder="Filter by Employee Name"
                value={selectEmployeeNameFilter}
                onChange={handleSearchInputChange}
                className="table-control-field"
            />
            <Select
                options={selectSkillsData}
                value={selectEmployeeSkillsFilter}
                name="searchSkills"
                isMulti
                closeMenuOnSelect={false}
                styles={CustomSelectStyles}
                placeholder="Filter by skills"
                onChange={(options: MultiValue<IReactSelectOption>) => {
                    dispatch(employeeSkillsFilterChange([...options]));
                }}
            />
            <Button
                className="outline icon-btn margin-left-auto table-control-field"
                onClick={() => dispatch(employeeListFilterClear())}
            >
                <span>Clear Filters</span>
                <span className="material-symbols-rounded">filter_alt_off</span>
            </Button>
        </StyledEmployeesFilterWrap>
    );
};

export default EmployeesTableFilter;
