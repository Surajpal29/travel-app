import express from 'express'
<<<<<<< HEAD
import { createBooking, deleteBooking, getAllBooking, getBooking } from '../Controllers/bookingController.js'
=======
import { createBooking, getAllBooking, getBooking } from '../Controllers/bookingController.js'
>>>>>>> 485b414cb290e351f8e3bc5a223336378823ae6d
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyAdmin, getAllBooking)
<<<<<<< HEAD
router.delete("/:id", verifyAdmin,deleteBooking)
=======
>>>>>>> 485b414cb290e351f8e3bc5a223336378823ae6d

export default router