import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import handleError from "./HandleServerError";

export const getCartByUserService = async (userID) => {
    try {
        const res = await axios.get(`${API_ENDPOINT_PREFIX}shoppingCart/getByUser/${userID}`);
        return {
            status: true,
            cart: res.data
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const addCartItemService = async (userID, cartItem) => {
    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}shoppingCart/addItem/${userID}`, cartItem);
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

export const removeCartItemService = async (userID, equipmentID) => {
    try {
        const res = await axios.delete(`${API_ENDPOINT_PREFIX}shoppingCart/removeItem/${userID}/${equipmentID}`);
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

export const buyCartItemService = async (userID) => {
    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}shoppingCart/checkout/${userID}/`);
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