import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import {
    Button,
    CustomInput,
    CustomTextarea,
    CustomRadioGroup,
    CustomSelect,
    Loader,
} from '..';
import StyledFormWrap from './EmployeeDetailsForm.style';
import {
    genders,
    locations,
    prefillDataOnEmployeeAdd,
} from '../../pages/ManageEmployees/constants';
import validate from './validation';
import { useAppContext } from '../../core/contexts/AppContext';
import { IEmployee } from '../../interfaces/common';
import handleFormSubmit from './handleFormSubmit';
import { sortObjByKey } from '../../utils';
import profilePictureAvatar from '../../assets/images/add-profile-photo.svg';

interface IEmployeeDetailsForm {
    empId?: string | null;
    prefillData?: IEmployee;
}

const EmployeeDetailsForm: React.FC<IEmployeeDetailsForm> = ({
    empId = null,
    prefillData = {
        ...prefillDataOnEmployeeAdd,
    },
}) => {
    const { appState } = useAppContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [photoId, setPhotoId] = useState(prefillData.photoId);
    const photoRef = useRef<HTMLInputElement>(null);

    const photoUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const imgFile = e.target.files[0];
            setPhotoId(URL.createObjectURL(imgFile));
        }
    };

    const handlePhotoLabelClick = (
        e: React.KeyboardEvent<HTMLLabelElement>
    ) => {
        if (e.key === 'Enter') {
            photoRef.current?.click();
        }
    };

    return (
        <>
            {loading ? (
                <Loader className="full-screen-loader" />
            ) : (
                <StyledFormWrap>
                    <Formik
                        initialValues={prefillData}
                        validationSchema={validate}
                        onSubmit={async (values) => {
                            setLoading(true);
                            await handleFormSubmit(
                                values,
                                empId,
                                photoRef.current
                            );
                            navigate(`/`);
                            setLoading(false);
                        }}
                    >
                        {(props) => {
                            return (
                                <form
                                    autoComplete="off"
                                    onSubmit={props.handleSubmit}
                                    noValidate
                                >
                                    <div className="flex form-row">
                                        <label
                                            htmlFor="photoId"
                                            className="profile-picture-wrap"
                                            tabIndex={0}
                                            onKeyDown={(e) =>
                                                handlePhotoLabelClick(e)
                                            }
                                        >
                                            <img
                                                src={
                                                    photoId ||
                                                    profilePictureAvatar
                                                }
                                                alt="employee profile photo"
                                                title="Add a profile photo"
                                                draggable="false"
                                            />
                                            <input
                                                type="file"
                                                className="display-none"
                                                name="photoId"
                                                id="photoId"
                                                accept="image/*"
                                                ref={photoRef}
                                                onChange={photoUploadHandler}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry">
                                            <CustomInput
                                                label="Full Name"
                                                name="firstName"
                                                id="name"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div className="form-entry">
                                            <CustomInput
                                                label="Email"
                                                name="email"
                                                id="email"
                                                placeholder="user@qburst.com"
                                                type="email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry">
                                            <CustomInput
                                                label="Date of Birth"
                                                name="dob"
                                                id="dob"
                                                type="date"
                                                required
                                            />
                                        </div>
                                        <CustomRadioGroup
                                            id="gender"
                                            label="Gender"
                                            name="gender"
                                            options={genders}
                                            className="form-entry"
                                            required
                                        />
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry">
                                            <CustomTextarea
                                                label="Address"
                                                name="address"
                                                rows="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry">
                                            <CustomSelect
                                                name="role"
                                                label="Role"
                                                options={appState.roles}
                                                placeholder="Select a Role"
                                                required
                                            />
                                        </div>
                                        <div className="form-entry">
                                            <CustomSelect
                                                name="department"
                                                label="Department"
                                                options={appState.departments}
                                                placeholder="Select a Department"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry">
                                            <CustomInput
                                                label="Date of Joining"
                                                name="dateOfJoining"
                                                type="date"
                                                required
                                            />
                                        </div>
                                        <div className="form-entry">
                                            <CustomSelect
                                                name="location"
                                                label="Location"
                                                options={sortObjByKey(
                                                    locations,
                                                    'label'
                                                )}
                                                placeholder="Select a Location"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry skills-input-container">
                                            <CustomSelect
                                                name="skills"
                                                label="Skills"
                                                options={appState.skills}
                                                placeholder="Select one or more skills"
                                                isMulti
                                                closeMenuOnSelect={false}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-controls-container flex">
                                        <Button
                                            className="outline"
                                            onClick={() => navigate(-1)}
                                        >
                                            CANCEL
                                        </Button>
                                        <Button
                                            className="primary"
                                            type="submit"
                                            disabled={props.isSubmitting}
                                        >
                                            SUBMIT
                                        </Button>
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </StyledFormWrap>
            )}
        </>
    );
};

export default EmployeeDetailsForm;
