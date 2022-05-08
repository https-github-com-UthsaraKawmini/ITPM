import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import { SweetAlert } from "./SweetAlert";
import handleError from "./HandleServerError";

// Reqest all employees from the server
export const getAllEmployeeService = () => {
    return axios
        .get(`${API_ENDPOINT_PREFIX}employees/`)
        .then((res) => {
            return {
                status: true,
                employees: res.data
            };
        })
        .catch((err) => {
            handleError(err)
            return {
                status: false,
            };
        });
};

// Reqest to crate employee
export const createEmployeeService = (employee) => {

    const formData = new FormData();
    formData.append("image", employee.image);
    formData.set("name", employee.name);
    formData.set("email", employee.email);
    formData.set("mobile", employee.mobile);
    formData.set("gender", employee.gender);
    formData.set("birthDate", employee.birthDate);
    formData.set("joinDate", employee.joinDate);
    formData.set("designation", employee.designation);
    formData.set("salary", employee.salary);

    return axios
        .post(`${API_ENDPOINT_PREFIX}employees/CreateEmployee`, formData)
        .then((res) => {
            SweetAlert("success", "Done!", "Employee Created Successfully!");
            return {
                status: true,
            };
        })
        .catch((err) => {
            handleError(err)
            return {
                status: false,
            };
        });
};

// Reqest to delete employee
export const deleteEmployeeervice = (id) => {
    return axios
        .delete(`${API_ENDPOINT_PREFIX}employees/DeleteEmployee/${id}`)
        .then((res) => {
            SweetAlert("success", "Done!", "Employee Deleted Succesfully!");
            return {
                status: true,
            };
        })
        .catch((err) => {
            handleError(err)
            return {
                status: false,
            };
        });
};

// Reqest to update employee
export const updateEmployeeService = (employee) => {
    const formData = new FormData();
    formData.append("image", employee.image);
    formData.set("name", employee.name);
    formData.set("email", employee.email);
    formData.set("mobile", employee.mobile);
    formData.set("gender", employee.gender);
    formData.set("birthDate", employee.birthDate);
    formData.set("joinDate", employee.joinDate);
    formData.set("salary", employee.salary);
    formData.set("isImageChanged", employee.isImageChanged);

    return axios
        .put(`${API_ENDPOINT_PREFIX}employees/UpdateEmployee/${employee.id}`, formData)
        .then((res) => {
            SweetAlert("success", "Done!", "Employee Updated Succesfully!");
            return {
                status: true,
            };
        })
        .catch((err) => {
            handleError(err)
            return {
                status: false,
            };
        });
};

