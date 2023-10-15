import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post('/create-payment', PaymentController.createPayment);
router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getSinglePayment);
router.patch('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export const paymentRoutes = router;
