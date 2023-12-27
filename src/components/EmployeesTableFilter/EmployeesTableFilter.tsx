import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
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
    employeeListClear,
} from '../../core/store/employeesList/actions';

const EmployeesTableFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectSkillsData = useAppSelector(
        (state) => state.dropdownData.skills.skillsData
    );
    const selectEmployeeNameFilter = useAppSelector(
        (state) => state.employees.employeesListFilter.employeeNameFilter
    );
    const selectEmployeeSkillsFilter = useAppSelector(
        (state) => state.employees.employeesListFilter.employeeSkillsFilter
    );

    const getSkillFilterInitialValue = (): MultiValue<IReactSelectOption> => {
        const skillsSearchParam = searchParams.get('skillIds');
        if (!skillsSearchParam) {
            return [];
        }
        const selectedSkillsForFilter = skillsSearchParam.split(',');

        const initialSkillsFilter = selectSkillsData.filter((skillObj) =>
            selectedSkillsForFilter.includes(skillObj.value)
        );
        console.log('inside funciton', initialSkillsFilter);
        return initialSkillsFilter;
    };

    const [skillFilter, setSkillFilter] = useState(
        getSkillFilterInitialValue()
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

    console.log('skill filter', skillFilter);

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
                value={(() => {
                    console.log(skillFilter);
                    return skillFilter;
                })()}
                name="searchSkills"
                isMulti
                closeMenuOnSelect={false}
                styles={CustomSelectStyles}
                placeholder="Filter by skills"
                onChange={(options: MultiValue<IReactSelectOption>) => {
                    // dispatch(employeeSkillsFilterChange([...options]));
                    setSkillFilter([...options]);
                    searchParams.set(
                        'skillIds',
                        options.map((option) => option.value).toString()
                    );
                    setSearchParams(searchParams);
                    dispatch(employeeListClear());
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
