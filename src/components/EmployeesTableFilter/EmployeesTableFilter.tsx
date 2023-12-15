import { Input, Button } from '..';
import Select, { MultiValue } from 'react-select';
import {
    CustomSelectStyles,
    StyledEmployeesFilterWrap,
} from './EmployeesTableFilter.style';
import { IReactSelectOption } from '../../interfaces/common';
import { IState } from '../../core/store';

import { useSelector, useDispatch } from 'react-redux';
import {
    employeeNameFilterChange,
    employeeSkillsFilterChange,
    employeeListFilterClear,
} from '../../core/store/employees/actions';
import { useEffect } from 'react';
import { fetchSkills } from '../../core/store/dropdownData/skills/actions';

const EmployeesTableFilter: React.FC = () => {
    const dispatch = useDispatch();

    const selectSkillsData = useSelector(
        (state: IState) => state.dropdownData.skills.skillsData
    );
    const selectEmployeeNameFilter = useSelector(
        (state: IState) =>
            state.employees.employeesListFilter.employeeNameFilter
    );
    const selectEmployeeSkillsFilter = useSelector(
        (state: IState) =>
            state.employees.employeesListFilter.employeeSkillsFilter
    );

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch<any>(
            employeeNameFilterChange(
                event.target.value.trimStart().toLowerCase()
            )
        );
    };

    useEffect(() => {
        dispatch<any>(fetchSkills());
    }, []);

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
                    dispatch<any>(employeeSkillsFilterChange([...options]));
                }}
            />
            <Button
                className="outline icon-btn margin-left-auto table-control-field"
                onClick={() => dispatch<any>(employeeListFilterClear())}
            >
                <span>Clear Filters</span>
                <span className="material-symbols-rounded">filter_alt_off</span>
            </Button>
        </StyledEmployeesFilterWrap>
    );
};

export default EmployeesTableFilter;
