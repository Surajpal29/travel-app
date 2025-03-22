import express from 'express'
import { createBooking, deleteBooking, getAllBooking, getBooking } from '../Controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.delete("/:id", verifyAdmin,deleteBooking)

export default router