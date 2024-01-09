import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/storeHelpers";
import { Field, Formik, FormikHelpers } from "formik";
import {
    Button,
    CustomInput,
    CustomTextarea,
    CustomRadioGroup,
    CustomSelect,
    Loader,
} from "..";
import StyledFormWrap from "./EmployeeDetailsForm.style";
import {
    genders,
    locations,
    prefillDataOnEmployeeAdd,
} from "../../pages/ManageEmployees/constants";
import validate from "./validation";
import { IEmployee } from "../../interfaces/common";
import handleFormSubmit from "./handleFormSubmit";
import { sortObjByKey } from "../../utils";
import profilePictureAvatar from "../../assets/images/add-profile-photo.svg";

interface IEmployeeDetailsForm {
    prefillData?: IEmployee;
}

const EmployeeDetailsForm: React.FC<IEmployeeDetailsForm> = ({
    prefillData = {
        ...prefillDataOnEmployeeAdd,
    },
}) => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth);

    const isAddPage =
        location.pathname.split("/")[1] === "add-employee" ? true : false;

    const navigate = useNavigate();

    const selectSkills = useAppSelector(
        (state) => state.dropdownData.skills.skillsData
    );
    const selectDepartments = useAppSelector(
        (state) => state.dropdownData.departments.departmentsData
    );
    const selectRoles = useAppSelector(
        (state) => state.dropdownData.roles.rolesData
    );

    const [loading, setLoading] = useState(false);

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
        if (e.key === "Enter") {
            photoRef.current?.click();
        }
    };

    const handleForm = async (
        values: IEmployee,
        { setSubmitting }: FormikHelpers<IEmployee>
    ) => {
        setLoading(true);
        await handleFormSubmit(values, photoRef.current, dispatch);
        setSubmitting(false);
        setLoading(false);
        navigate(`/`);
    };

    return (
        <>
            {loading ? (
                <Loader className="full-screen-loader" />
            ) : (
                <StyledFormWrap>
                    <Formik
                        initialValues={prefillData}
                        enableReinitialize
                        validationSchema={validate(isAddPage)}
                        onSubmit={handleForm}
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
                                            <CustomInput
                                                label="Password"
                                                name="password"
                                                id="password"
                                                type="password"
                                                required
                                                disabled={!isAddPage}
                                            />
                                        </div>
                                        <div className="form-entry">
                                            <CustomInput
                                                label="Mobile Number"
                                                name="phone"
                                                id="phone"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex form-row">
                                        <div className="form-entry">
                                            <CustomSelect
                                                name="department"
                                                label="Department"
                                                options={selectDepartments}
                                                placeholder="Select a Department"
                                                required
                                            />
                                        </div>
                                        <div className="form-entry">
                                            <CustomSelect
                                                name="role"
                                                label="Role"
                                                options={selectRoles}
                                                placeholder="Select a Role"
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
                                                    "label"
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
                                                options={selectSkills}
                                                placeholder="Select one or more skills"
                                                isMulti
                                                closeMenuOnSelect={false}
                                                required
                                            />
                                        </div>
                                    </div>
                                    {user.isAdmin && (
                                        <div className="form-entry checkbox">
                                            <Field
                                                type="checkbox"
                                                name="isAdmin"
                                                id="isAdmin"
                                            />
                                            <label htmlFor="isAdmin">
                                                Provide Admin Access
                                            </label>
                                        </div>
                                    )}
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
