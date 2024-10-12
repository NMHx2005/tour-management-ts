import { Request, Response } from "express"
import Tour from "../../models/tour.model";
import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
    // Lấy ra danh mục 
    const slugCategory = req.params.slugCategory;

    // Lấy ra danh sách tour với trạng thái active và chưa bị xóa
    const tours = await sequelize.query(`
        SELECT tours.*, ROUND(price * (1 - discount/100)) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE
            categories.slug = '${slugCategory}'
            AND categories.deleted = false
            AND categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active';
    `, {
        type: QueryTypes.SELECT,
    })
    for (const item of tours) {
        if(item["images"]) {
          const arrayImage = JSON.parse(item["images"]);
          if(arrayImage.length > 0) {
            item["image"] = arrayImage[0];
          }
        }
        item["price_special"] = parseInt(item["price_special"]);
    }


    res.render("client/pages/tours/index", {
        pageTitle: "Danh sách tours",
        tours: tours
    });
}