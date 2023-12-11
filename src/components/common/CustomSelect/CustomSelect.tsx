import Select, { GroupBase } from 'react-select';
import type {} from 'react-select/base';
import { useField } from 'formik';
import CustomSelectStyles from './CustomSelect.style';
import makeAnimated from 'react-select/animated';
import { IReactSelectOption } from '../../../interfaces/common';

//extending select to include extra prop isValid
declare module 'react-select/base' {
    export interface Props<
        Option,
        IsMulti extends boolean,
        Group extends GroupBase<Option>
    > {
        isValid?: boolean;
    }
}

interface ICustomSelect {
    label: string;
    name: string;
    id?: string;
    placeholder?: string;
    options: IReactSelectOption[];
    isMulti?: boolean;
    closeMenuOnSelect?: false;
    required?: boolean;
}

const animatedComponents = makeAnimated();

const CustomSelect: React.FC<ICustomSelect> = ({
    label,
    options,
    required,
    ...props
}) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    return (
        <>
            <label
                htmlFor={props.id || props.name}
                className={required ? 'required-field' : ''}
            >
                {label}
            </label>
            <Select
                options={options}
                styles={CustomSelectStyles}
                onBlur={() =>
                    field.onBlur({
                        target: {
                            name: field.name,
                        },
                    })
                }
                value={field.value}
                onChange={(option: IReactSelectOption) => {
                    if (option) {
                        setValue(option);
                    }
                }}
                components={animatedComponents}
                {...props}
                isValid={meta.touched && meta.error ? false : true}
            />
            {meta.touched && meta.error ? (
                <div className="error-msg">{meta.error}</div>
            ) : null}
        </>
    );
};

export default CustomSelect;
