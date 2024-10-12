import { Request, Response } from "express"
import Tour from "../../models/tour.model";


export const index = async (req: Request, res: Response) => {

    // Lấy ra danh sách tour với trạng thái active và chưa bị xóa
    const tours = await Tour.findAll({
        where: {
          deleted: false,
          status: "active"
        },
        raw: true
    });    
    res.render("client/pages/tours/index", {
        pageTitle: "Danh sách tours",
        tours: tours
    });
}