import { useAppSelector, useAppDispatch } from '../../hooks/storeHelpers';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input, Button } from '..';
import Select, { MultiValue } from 'react-select';
import {
    CustomSelectStyles,
    StyledEmployeesFilterWrap,
} from './EmployeesTableFilter.style';
import { IReactSelectOption } from '../../interfaces/common';
import {
    employeeNameFilterChange,
    employeeListFilterClear,
    employeeListClear,
} from '../../core/store/employeesList/actions';

const EmployeesTableFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [skillFilter, setSkillFilter] = useState<
        MultiValue<IReactSelectOption>
    >([]);

    const selectSkillsData = useAppSelector(
        (state) => state.dropdownData.skills.skillsData
    );
    const selectEmployeeNameFilter = useAppSelector(
        (state) => state.employees.employeesListFilter.employeeNameFilter
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

    const handleSkillSelectChange = (
        selectedOptions: MultiValue<IReactSelectOption>
    ) => {
        setSkillFilter(selectedOptions);

        if (!selectedOptions.length) {
            searchParams.delete('skillIds');
        } else {
            const selectedOptionsValue = selectedOptions.map(
                (option) => option.value
            );
            searchParams.set('skillIds', selectedOptionsValue.toString());
        }
        dispatch(employeeListClear());
        setSearchParams(searchParams);
    };

    // Update selectedOptions state based on URL parameters
    useEffect(() => {
        if (selectSkillsData) {
            const urlSelectedSkillValues = searchParams
                .get('skillIds')
                ?.split(',');

            if (urlSelectedSkillValues) {
                const selectedSkillsFromUrl = selectSkillsData.filter(
                    (option) => urlSelectedSkillValues.includes(option.value)
                );
                setSkillFilter(selectedSkillsFromUrl);
            }
        }
    }, [selectSkillsData]);

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
                value={skillFilter}
                name="searchSkills"
                isMulti
                closeMenuOnSelect={false}
                styles={CustomSelectStyles}
                placeholder="Filter by skills"
                onChange={handleSkillSelectChange}
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
