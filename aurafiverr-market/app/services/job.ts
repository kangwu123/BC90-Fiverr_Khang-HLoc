import api from "./api";

// Lấy menu loại công việc
export const getJobMenu = async () => {
    const response = await api.get("cong-viec/lay-menu-loai-cong-viec");
    return response.data;
};

export const getJobsByCategory = async (categoryId: number) => {
    const response = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-loai/${categoryId}`);
    return response.data;
};

export const getJobsByName = async (name: string) => {
    const response = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`);
    return response.data;
};

export const getJobsByDetailType = async (detailTypeId: number) => {
    const response = await api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${detailTypeId}`);
    return response.data;
};
