import axios from "axios";
import { API_ENDPOINT_PREFIX } from "./Constants";
import { SweetAlert } from "./SweetAlert";
import handleError from "./HandleServerError";


export const crateEquipmentsService = (equipment) => {

    const formData = new FormData();
    formData.append("image", equipment.image);
    formData.set("name", equipment.name);
    formData.set("equipmentId", equipment.equipmentId);
    formData.set("country", equipment.country);
    formData.set("SalesCount", equipment.SalesCount);

    return axios
        .post(`${API_ENDPOINT_PREFIX}equipments/CreateEquipment`, formData)
        .then((res) => {
            SweetAlert("success", "Done!", "Equipments Created Successfully!");
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

export const getAllEquipmentsServices = () => {
    return axios
        .get(`${API_ENDPOINT_PREFIX}equipments/`)
        .then((res) => {
            return {
                status: true,
                equipments: res.data
            };
        })
        .catch((err) => {
            handleError(err)
            return {
                status: false,
            };
        });
};



export const updateEquipmentsServices = (equipments) => {
    const formData = new FormData();
    formData.append("image", equipments.image);
    formData.set("name", equipments.name);
    formData.set("EquipmentId", equipments.equipmentId);
    formData.set("country", equipments.country);
    formData.set("SalesCount", equipments.SalesCount);
    formData.set("isImageChanged", equipments.isImageChanged);

    return axios
        .put(`${API_ENDPOINT_PREFIX}equipments/UpdateEquipment/${equipments.id}`, formData)
        .then((res) => {
            SweetAlert("success", "Done!", "Equipment Updated Succesfully!");
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

export const deleteEquipmentsServices = (id) => {
    return axios
        .delete(`${API_ENDPOINT_PREFIX}equipments/DeleteEquipment/${id}`)
        .then((res) => {
            SweetAlert("success", "Done!", "Equipment Deleted Succesfully!");
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

