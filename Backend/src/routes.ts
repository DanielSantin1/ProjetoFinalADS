import { Router } from 'express'
import multer from 'multer';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { isAuthenticated } from './Middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/Category/CreateCategoryController';
import { ListCategoryController } from './controllers/Category/ListCategoryController';
import { CreateProductController } from './controllers/produtos/CreateProductController';
import { ListByCategoryController } from './controllers/produtos/ListByCategoryController';
import { CreateOrderController } from './controllers/Orders/CreateOrderController';
import { RemoveOrderController } from './controllers/Orders/RemoveOrderController';
import { AddItemController } from './controllers/Orders/AddItemController';
import { RemoveItemController } from './controllers/Orders/RemoveItemController';
import { SendOrderController } from './controllers/Orders/SendOrderController';
import { ListOrderController } from './controllers/Orders/ListOrderController';
import { DetailOrderController } from './controllers/Orders/DetailOrderController';
import { FinishOrderController } from './controllers/Orders/FinishOrderController';


import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//rotas de usuário
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

//rotas de categorias 
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//rotas de produto
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//rotas de orders
router.post('/order', isAuthenticated, new CreateOrderController().handle)

router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle )

router.put('/order/send', isAuthenticated, new SendOrderController().handle )

router.get('/orders', isAuthenticated, new ListOrderController().handle)

router.get('/order/detail', isAuthenticated, new DetailOrderController().handle )

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) 

export { router };