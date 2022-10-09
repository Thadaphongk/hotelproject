const { Bloghotel } = require('../models')

module.exports = {
   
    async index(req, res) {
        try {
            const bloghotels = await Bloghotel.findAll()
            res.send(bloghotels)
        } catch (err) {
            res.status(500).send({
                error: 'The blogs information was incorrect'
            })
        }
    },


    async create(req, res) {
        try {
            const bloghotel = await Bloghotel.create(req.body)
            res.send(bloghotel.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create blog incorrect'
            })
        }
    },

 
    async put(req, res) {
        try {
            await Bloghotel.update(req.body, {
                where: {
                    id: req.params.bloghotelId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update blog incorrect'
            })
        }
    },

   
    async remove(req, res) {
        try {
            const bloghotel = await Bloghotel.findOne({
                where: {
                    id: req.params.bloghotelId
                }
            })

            if (!bloghotel) {
                return res.status(403).send({
                    error: 'The blog information was incorrect'
                })
            }

            await bloghotel.destroy()
            res.send(bloghotel)
        } catch (err) {
            res.status(500).send({
                error: 'The blog information was incorrect'
            })
        }
    },

    
  async show (req, res) {
    try {
      const bloghotel = await Bloghotel.findByPk(req.params.bloghotelId)
      res.send(bloghotel)
    } 
    catch (err) {
        res.status(500).send({
            error: 'The blog information was incorrect'
        })
    }
  }
}