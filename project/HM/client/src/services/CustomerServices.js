import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import { SweetAlert } from "./SweetAlert";
import handleError from "./HandleServerError";

export const customerSignUpService = (customer) => {
    const formData = new FormData();
    formData.append("image", customer.image);
    formData.set("name", customer.name);
    formData.set("email", customer.email);
    formData.set("password", customer.password);
    formData.set("mobile", customer.mobile);
    formData.set("gender", customer.gender);
    formData.set("birthDate", customer.birthDate);

    return axios
        .post(`${API_ENDPOINT_PREFIX}customers/SignUp`, formData)
        .then((res) => {
            SweetAlert("success", "Done!", "Profile Created Successfully!");
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

export const customerSignINService = (customer) => {
    return axios
        .post(`${API_ENDPOINT_PREFIX}customers/SignIn`, customer)
        .then((res) => {
            SweetAlert("success", "Done!", "Successfully Signed In!");
            localStorage.setItem("customer", JSON.stringify(res.data))
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

export const deleteCustomerService = (id) => {
    return axios
        .delete(`${API_ENDPOINT_PREFIX}customers/DeleteCustomer/${id}`)
        .then((res) => {
            SweetAlert("success", "Done!", "Account Deleted Succesfully!");
            localStorage.removeItem("customer");
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

export const getAllCustomerService = () => {
    return axios
        .get(`${API_ENDPOINT_PREFIX}customers/`)
        .then((res) => {
            return {
                status: true,
                customers: res.data
            };
        })
        .catch((err) => {
            handleError(err)
            return {
                status: false,
            };
        });
};

export const updateCustomerService = (id, customer) => {
    const formData = new FormData();

    formData.append("image", customer.image);
    formData.set("name", customer.name);
    formData.set("email", customer.email);
    formData.set("password", customer.password);
    formData.set("mobile", customer.mobile);
    formData.set("gender", customer.gender);
    formData.set("birthDate", customer.birthDate);
    formData.set("isImageChanged", customer.isImageChanged);

    return axios
        .put(`${API_ENDPOINT_PREFIX}customers/UpdateCustomer/${id}`, formData)
        .then((res) => {
            SweetAlert("success", "Done!", "Account Updated Succesfully!");
            localStorage.setItem("customer", JSON.stringify(res.data))
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

