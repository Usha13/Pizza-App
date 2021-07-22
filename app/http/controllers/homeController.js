const Menu = require("../../models/menu")

function homeController() {
  return { 
      async index(req,res) {
          try {
            const data = await Menu.find()
            console.log(data)
            res.render('home', {
                products : data
            })
          } catch (error) {
              console.log(error)
          }
       
      }
  }
}

module.exports = homeController