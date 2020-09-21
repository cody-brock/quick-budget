const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Income = db.Income

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.userBudget = (req, res) => {
  console.log("=======================");
  console.log("=======================");
  console.log("req: ", req.userId);
  console.log("=======================");
  console.log("=======================");
  
  db.Income_Item.findAll({
    where: {
      user_id: req.userId
    },
    include: [db.Income_Type]
    // include: [db.user_category]
    // include: [{
    //   model: db.User,
    //   // where: {id: 1}
    // }]
    
  })
    .then(cat => {
      console.log(cat);

      if (!cat) {
        return res.status(404).send({ message: "User's Income not found. Or is user not logged in?" });
      }


      console.log('cat: ', cat);
      let arr = [];
      cat.forEach(elem => {
        let obj = {};
        obj.val = elem.value;
        obj.name = elem.Income_Type.name;
        obj.desc = elem.Income_Type.description;
        arr.push(obj);
      })



      res.status(200).send({
        category: arr
      });

    })
    .catch(err => {

      res.status(500).send({ message: err.message });
    });


  // SAVING FOR REFERENCE
  // Income.findOne({
  //   where: {
  //     user_id: req.userId
  //   }
  // })
  //   .then(income => {
  //     if (!income) {
  //       return res.status(404).send({ message: "User's Income not found. Or is user not logged in?" });
  //     }

  //     res.status(200).send({
  //       userIncomeRes: income
  //     });

  //   })
  //   .catch(err => {

  //     res.status(500).send({ message: err.message });
  //   });

};