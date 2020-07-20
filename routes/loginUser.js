// const express = require('express')
// const app = express();

// // sets basic route for dashboard
// app.get('/dashboard', (req, res) => {
//     // if (req.admin && req.cookies.user_sid) {
//         res.render('index', {layout : 'dashboard'});
//     // }
// })

// module.exports = router;


var express = require('express');
var router  = express.Router();


router.post('/dashboard', passport.authenticate("local"), users_controller.loginUser);

module.exports = router;


// 

// firstName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//       validate: {
//         len: [6]
//       }
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true
//     }
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }