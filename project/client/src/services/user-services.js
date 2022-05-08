import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import handleError from "./HandleServerError";
import { SweetAlert } from "./SweetAlert";

export const fetchAllUsersService = async () => {
    try {
        const res = await axios.get(`${API_ENDPOINT_PREFIX}user/`);
        return {
            status: true,
            users: res.data
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const signupService = async (user) => {
    const formData = new FormData();
    formData.append("image", user.image);
    formData.set("userName", user.userName);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("mobile", user.mobile);
    formData.set("address", user.address);
    formData.set("userType", user.userType);

    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}user/SignUp`, formData);
        SweetAlert("success", "Done!", res.data);
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const signInService = async (user) => {
    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}user/Signin`, user);
        SweetAlert("success", "Done!", `Welcome back ${res.data.userName}!`);
        localStorage.setItem("user", JSON.stringify(res.data));
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const updateUserService = async (UserID, user) => {
    const formData = new FormData();

    formData.append("image", user.image);
    formData.set("userName", user.userName);
    formData.set("mobile", user.mobile);
    formData.set("address", user.address);
    formData.set("isImageUpdated", user.isImageUpdated);

    try {
        const res = await axios.put(`${API_ENDPOINT_PREFIX}user/UpdateUser/${UserID}`, formData);
        SweetAlert("success", "Done!", "User account updated successfully!");
        localStorage.setItem("user", JSON.stringify(res.data));
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const deleteUserService = async (userId) => {
    try {
        const res = await axios.delete(`${API_ENDPOINT_PREFIX}user/DeleteUser/${userId}`);
        SweetAlert("success", "Done!", res.data);
        localStorage.removeItem("user");
        return {
            status: true,
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

