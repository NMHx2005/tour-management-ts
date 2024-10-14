import { Request, Response } from "express";



// [POST] /order
export const index = async (req: Request, res: Response) => {
    console.log(req.body); // Lấy ra data được gửi lên từ client

    res.json({
        code: 200,
        message: "Đặt hàng thành công!"
    });
};