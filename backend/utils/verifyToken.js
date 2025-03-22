import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
<<<<<<< HEAD
   // const token = req.cookies.accessToken
   const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDUzNTg0MGU0YjI3YmQxNzgxZDQyYiIsInJvbGUiOiJhZG1pblxuIiwiaWF0IjoxNzQyMTkxMzc1LCJleHAiOjE3NDM0ODczNzV9.80tnL-Mzy3MsEgfjjcpvOhyiUWRX9TLQVvWlUgw0jyw'
   console.log('====================================');
   console.log(token);
   console.log('====================================');
=======
   const token = req.cookies.accessToken

>>>>>>> 485b414cb290e351f8e3bc5a223336378823ae6d
   if (!token) {
      return res.status(401).json({ success: false, message: "You are not authorize!" })
   }

   // if token is exist then verify the token
   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
         return res.status(401).json({ success: false, message: "Token is invalid" })
      }

      req.user = user
      next()
   })
}


export const verifyUser = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authenticated" })
      }
   })
}


export const verifyAdmin = (req, res, next) => {
   verifyToken(req, res, next, () => {
      if (req.user.role === 'admin') {
         next()
      } else {
         return res.status(401).json({ success: false, message: "You are not authorize" })
      }
   })
} 