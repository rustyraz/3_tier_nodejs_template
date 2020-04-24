import { Investment, User } from '../database/models'

export default {
  getInvestments: async (req, res) => {
    try {
      const investmentsData = await Investment.find({})
      res.status(201).json({
        success: true,
        data: investmentsData
      })
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
      res.status(201).json({
        success: true,
        data: investmentData
      })
    } catch (error) {
      res.status(400).json({ error })
    }
  },

  newInvestment: async (req, res) => {
    try {
      // 1. get the user
      const owner = await User.findById(req.value.validBody.owner)
      // 2. create the investment
      if (owner) {
        const newInvestmentRawData = req.value.validBody
        delete newInvestmentRawData.owner

        const investment = new Investment(newInvestmentRawData)
        investment.owner = owner // give a reference to the real user entry in the db
        await investment.save()

        // 3. add new investment to the user
        owner.investments.push(investment)
        await owner.save()

        // Done
        res.status(200).json(investment)
      } else {
        res.status(400).json({
          error: 'Could not find the user to assing to that investment'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  },

  updateInvestment: async (req, res) => {
    res.status(200).json({
      success: true,
      data: null,
      message: 'This is the update route'
    })
  },

  deleteInvestment: async (req, res) => {
    const id = req.value.validParams.id
    try {
      const deleteInvestment = await Investment.deleteOne({ _id: id })
      if (deleteInvestment) {
        res.status(200).json({
          success: true,
          message: 'Investment deleted successfully'
        })
      } else {
        res.status(400).json({
          error: true,
          message: 'Something went wrong while trying to delete'
        })
      }
    } catch (error) {
      res.status(400).json({
        error: 'Could not delete that investment'
      })
    }
  }
}
