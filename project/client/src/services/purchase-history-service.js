import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import handleError from "./HandleServerError";

export const getPurchaseHistoryByUserService = async (userID) => {
    try {
        const res = await axios.get(`${API_ENDPOINT_PREFIX}purchaseHistory/getByUser/${userID}`);
        return {
            status: true,
            purchaseHistory: res.data
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};