import { Response, Request } from "express";

import { SendOrderService } from "../../services/orders/SendOrderService";

class SendOrderController{

    async handle(req:Request, res:Response){
        const {order_id} = req.body

        const sendOder = new SendOrderService();

        const order = await sendOder.execute({
            order_id
        });
        return res.json(order);
     
    
    }
}

export{SendOrderController}