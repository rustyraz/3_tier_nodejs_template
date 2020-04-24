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
      const owner = await User.findById(req.value.validBody.owner).select('email name investments')
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
      // get the investment
      const investment = await Investment.findById(id)
      if (!investment) {
        return res.status(404).json({ error: 'Investment does not exist' })
      }

      const ownerId = investment.owner
      // Get the owner
      const owner = await User.findById(ownerId)

      // Remove the investment
      await investment.remove()
      // Remove investment from user
      owner.investments.pull(investment)
      await owner.save()
      res.status(200).json({
        success: true,
        message: 'Investment deleted successfully'
      })
    } catch (error) {
      res.status(400).json({
        error: 'Error occured while trying to delete investment'
      })
    }
  }
}
