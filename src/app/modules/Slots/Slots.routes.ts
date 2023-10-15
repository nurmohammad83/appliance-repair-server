import express from 'express';
import { TimeSlotsController } from './Slots.controller';

const router = express.Router();

router.post('/create-time-slot', TimeSlotsController.createTimeSlot);
router.get('/', TimeSlotsController.getAllTimeSlots);
router.get('/:id', TimeSlotsController.getSingleTimeSlot);
router.patch('/:id', TimeSlotsController.updateTimeSlot);
router.delete('/:id', TimeSlotsController.deleteTimeSlot);

export const TimeSlotsRoutes = router;
