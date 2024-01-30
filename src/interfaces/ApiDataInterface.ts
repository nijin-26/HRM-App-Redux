export interface IAPISignInRequest {
    username: string;
    password: string;
}

export interface IAPISignInResponse {
    access_token: string;
    refresh_token: string;
}
export interface IAPISignUpRequest {
    username: string;
    password: string;
}

export interface IAPISignUpResponse {
    id: number;
    username: string;
}

export interface IApiEmployee {
    id: number;
    firstName: string;
    lastName: string;
    isActive: boolean;
    password?: string;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    salary: string;
    dateOfJoining: string;
    address: string;
    role: IApiRole | null;
    department: IApiDepartment | null;
    skills: IApiSkill[];
    moreDetails: string;
}

export interface IApiEmployeesData {
    employees: IApiEmployee[];
    count: number;
}

export interface IApiFetchEmployeesArray {
    message: string;
    data: IApiEmployeesData;
}

export interface IApiFetchEmployee {
    message: string;
    data: IApiEmployee;
}

export interface IApiEmployeeSubmission {
    firstName: string;
    lastName: string;
    isActive: boolean;
    dob: string;
    email: string;
    phone: string;
    designation: string;
    salary: string;
    dateOfJoining: string;
    address: string;
    role: number | null;
    department: number | null;
    skills: number[];
    moreDetails: string;
}

export interface IApiEmployeePostRepsonse {
    message: string;
    data: { id: number };
}

export interface IApiFetchSkill {
    message: string;
    data: IApiSkill[];
}

export interface IApiSkill {
    id: number;
    skill: string;
}

export interface IApiDepartment {
    id: number;
    department: string;
}

export interface IApiRole {
    id: number;
    role: string;
}

export interface IApiLocation {
    location: string;
}
