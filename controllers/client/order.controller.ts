import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateOrderCode } from "../../helpers/generate.helper";



// [POST] /order
export const index = async (req: Request, res: Response) => {
    // console.log(req.body); // Lấy ra data được gửi lên từ client

    const data = req.body;

    // Lưu data vào bảng orders
    const dataOrders = { // Tạo ra theo model đã có sẵn
        code: "", // mã code để rỗng để tạo id trước
        fullName: data.info.fullName,
        phone: data.info.phone,
        note: data.info.note,
        status: "initial"
    }

    const order = await Order.create(dataOrders); 
    const orderId = order.dataValues.id;
    const code = generateOrderCode(orderId); // sau khi tạo id xong thì lấy id ra và tạo thành mã code

    await Order.update({ // Cập nhật lại order với mã code sau khi được tạo
        code: code
    }, {
        where: {
            id: orderId
        }
    })


    res.json({
        code: 200,
        message: "Đặt hàng thành công!",
        orderCode: code
    });
};