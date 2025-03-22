
import mongoose from 'mongoose'
import Booking from './../models/Booking.js'


// create new booking
export const createBooking = async(req,res) => {
   const newBooking = new Booking(req.body)

   try {
      const savedBooking = await newBooking.save()

      res.status(200).json({success:true, message:"Your tour is booked!", data:savedBooking})
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}

// get single booking


export const getBooking = async (req, res) => {
  const { id } = req.params;  // Ye userId hoga
  
  console.log("🚀 Incoming Request for User ID:", id);
  
  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("❌ Invalid MongoDB ID:", id);
    return res.status(400).json({ success: false, message: "Invalid User ID!" });
  }

  try {
    // Agar ek hi booking chahiye to findOne, multiple ke liye find()
    const bookings = await Booking.find({ userId: id });

    console.log("📌 Fetched Bookings:", bookings);

    if (!bookings.length) {
      console.log("⚠️ No Bookings Found for this User!");
      return res.status(404).json({ success: false, message: "No Bookings Found!" });
    }

    res.status(200).json({ success: true, message: "Successful!", data: bookings });

  } catch (error) {
    console.error("🔥 Server Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error!", error: error.message });
  }
};


// export const getBooking = async(req,res) => {
//    const id = req.params.id
   
//    try {
//       const book = await Booking.findById(id)

//       res.status(200).json({success:true, message:"Successful!", data:book})
//    } catch (error) {
//       res.status(404).json({success:true, message:"Not Found!"})
//    }
// } 



// get all booking
export const getAllBooking = async(req,res) => {
   
   try {
      const books = await Booking.find()

      res.status(200).json({success:true, message:"Successful!", data:books})
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }

} 


export const deleteBooking= async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, message: "Booking canceled successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
