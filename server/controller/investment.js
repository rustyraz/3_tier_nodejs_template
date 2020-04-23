import { Investment } from '../database/models'

export default {
  getInvestments: async (req, res) => {
    try {
      const investmentsData = await Investment.find({})
      if (investmentsData) {
        res.status(201).json({
          success: true,
          data: investmentsData
        })
      } else {
        res.status(400).send('Something went wrong')
      }
    } catch (error) {
      res.status(400).json({
        error: true
      })
    }
  },

  getInvestmentById: async (req, res) => {
    const id = req.value.validParams.id
    try {
      const investmentData = await Investment.findById(id)
      if (investmentData) {
        res.status(201).json({
          success: true,
          data: investmentData
        })
      } else {
        res.status(400).send('Something went wrong')
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  }


}
