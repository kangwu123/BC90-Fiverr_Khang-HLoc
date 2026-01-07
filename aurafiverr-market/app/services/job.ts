import api from "./api";

export const getJobMenu = async () => {
    const response = await api.get("cong-viec/lay-menu-loai-cong-viec");
    return response.data;
};
