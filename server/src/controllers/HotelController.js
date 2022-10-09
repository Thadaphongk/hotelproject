const { Hotel } = require('../models')

module.exports = {
   
    async index(req, res) {
        try {
            const hotels = await Hotel.findAll()
            res.send(hotels)
        } catch (err) {
            res.status(500).send({
                error: 'The hotels information was incorrect'
            })
        }
    },

   
    async create(req, res) {
        try {
            const hotel = await Hotel.create(req.body)
            res.send(hotel.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create hotel incorrect'
            })
        }
    },

   
    async put(req, res) {
        try {
            await Hotel.update(req.body, {
                where: {
                    id: req.params.hotelId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update hotel incorrect'
            })
        }
    },

  
    async remove(req, res) {
        try {
            const hotel = await Hotel.findOne({
                where: {
                    id: req.params.hotelId
                }
            })

            if (!hotel) {
                return res.status(403).send({
                    error: 'The hotel information was incorrect'
                })
            }

            await hotel.destroy()
            res.send(hotel)
        } catch (err) {
            res.status(500).send({
                error: 'The hotel information was incorrect'
            })
        }
    },

    
    async show (req, res) {
        try {
            const hotel = await Hotel.findByPk(req.params.hotelId)
            res.send(hotel)
        } catch (err) {
            res.status(500).send({
                error: 'The hotel information was incorrect'
            })
        }
    },
}