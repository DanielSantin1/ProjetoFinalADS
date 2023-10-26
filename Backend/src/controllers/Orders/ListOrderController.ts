import { Request, Response } from "express";

import { ListByCategoryService } from "../../services/produtos/ListByCategoryService";
import { ListOrderService } from "../../services/orders/ListOrderService";

class ListOrderController{
    async handle(req: Request, res:Response){
        const listOrderService = new ListOrderService();

        const orders = await listOrderService.execute();

        return res.json(orders);
    }
}
export{ListOrderController}