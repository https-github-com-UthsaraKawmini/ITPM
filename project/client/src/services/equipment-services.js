import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import { SweetAlert } from "./SweetAlert";
import handleError from "./HandleServerError";

export const getAllEquipments = async () => {
    try {
        const res = await axios.get(`${API_ENDPOINT_PREFIX}equipment/all`);
        return {
            status: true,
            equipments: res.data
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const getAvailableEquipments = async () => {
    try {
        const res = await axios.get(`${API_ENDPOINT_PREFIX}equipment/available`);
        return {
            status: true,
            equipments: res.data
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const getEquipmentByID = async (equipmentId) => {
    try {
        const res = await axios.get(`${API_ENDPOINT_PREFIX}equipment/getByID/${equipmentId}`);
        return {
            status: true,
            equipment: res.data
        };
    } catch (err) {
        handleError(err);
        return {
            status: false,
        };
    }
};

export const createEquipmentService = async (equipment) => {
    const formData = new FormData();

    formData.append("image", equipment.image);
    formData.set("name", equipment.name);
    formData.set("description", equipment.description);
    formData.set("price", equipment.price);
    formData.set("quantity", equipment.quantity);

    try {
        const res = await axios.post(`${API_ENDPOINT_PREFIX}equipment/create`, formData);
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