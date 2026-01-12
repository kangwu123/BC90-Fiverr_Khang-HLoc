export interface TUser {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: number | null;
    birthday: string;
    avatar: string | null;
    gender: boolean;
    role: string;
    skill: string[];
    certification: string[];
}

export type TCongViec = {
    id: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    hinhAnh: string;
    moTa: string;
    moTaNgan: string;
    saoCongViec: number;
    maChiTietLoaiCongViec: number;
    nguoiTao: number;
};

export type TJob = {
    id: number;
    congViec: TCongViec;
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
};
export interface TSubtype {
    id: number;
    tenChiTiet: string;
    hinhAnh: string;
    maLoaiCongviec: number;
}
export type TComment = {
    id: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
    tenNguoiBinhLuan: string;
    avatar: string;
};

export type TJobDetail = TJob & {
    chiTietLoai: any[];
};
