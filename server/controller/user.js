import { User, Investment } from '../database/models'
import sha256 from 'sha256'

export default {
/***
 * getUser
 * retrieve and return all users in the User model
*/
  getUser: async (req, res, next) => {
    try {
      const userData = await User.find({}).select('email name investments')
      if (userData) {
        res.status(201).json({
          success: true,
          data: userData
        })
      } else {
        res.status(400).send('Something went wrong')
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  /***
     * getUserById
     * retrieve and return a user using the ID in the User model
    */
  getUserById: async (req, res) => {
    const id = req.value.validParams.id
    try {
      const userData = await User.findById(id).select('email name investments')
      if (userData) {
        res.status(201).json({
          success: true,
          data: userData
        })
      } else {
        res.status(400).send('Something went wrong')
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  /***
     * registerUser
     * Add a new User to the database
     * Future improvements will be done like VALIDATION
    */
  registerUser: async (req, res) => {
    const { email, password } = req.value.validBody

    const userData = {
      email,
      hashedPassword: sha256(password) // we will use a better module for this
    }

    try {
      const newUser = new User(userData)
      const saveUser = await newUser.save()
      if (saveUser) {
        res.status(201).json({
          success: true,
          data: saveUser
        })
      } else {
        res.status(400).send('Something went wrong')
      }
    } catch (error) {
      const errorMsg = (error.errors && error.errors[Object.keys(error.errors)[0]].message) ? error.errors[Object.keys(error.errors)[0]].message : null
      res.status(400).json({
        error: true,
        message: errorMsg || 'An error occured when trying to save the data'
      })
    }
  },
  /***
     * patchUserDetails
     * update using the ID in the User model
    */
  patchUserDetails: async (req, res) => {
    const id = req.value.validBody.id
    const updateData = { name: req.value.validBody.name }
    try {
      const updateUser = await User.findByIdAndUpdate(id, updateData, { new: true })
      if (updateUser) {
        res.status(201).json({
          success: true,
          data: updateUser
        })
      } else {
        res.status(400).send('Something went wrong')
      }
    } catch (error) {
      console.log(error)
      res.status(404).send('An error occured')
    }
  },
  /***
     * deleteUser
     * delete user by ID in the User model
    */
  deleteUserById: async (req, res) => {
    const id = req.value.validParams.id
    try {
      const deleteUser = await User.findByIdAndDelete(id)
      if (deleteUser) {
        res.status(200).json({
          success: true,
          message: 'User deleted successfully'
        })
      } else {
        res.status(400).json({
          error: true,
          message: 'Something went wrong while trying to delete'
        })
      }
    } catch (error) {
      res.status(400).json({
        error: 'Could not delete that user'
      })
    }
  },
  /***
   * newUserInvestments
   * post a new investements
   */
  newUserInvestments: async (req, res) => {
    const userId = req.value.validParams.id
    try {
      // get the user using the id
      const user = await User.findById(userId).select('email name investments')
      // create a new investment
      const newInvestment = new Investment(req.value.validBody)
      // assign investment to the user
      newInvestment.owner = user
      // save the investment
      await newInvestment.save()
      // add the investment to the user investments array 'investments'
      user.investments.push(newInvestment)
      // save the user
      await user.save()
      res.status(201).json({
        success: true,
        data: {}
      })
    } catch (error) {
      console.log(error)
      res.status(404).send('An error occured')
    }
  },
  /**
   * getUserInvestments
   * Get the investments under the user
   */
  getUserInvestments: async (req, res) => {
    const userId = req.value.validParams.id
    try {
      const user = await User.findById(userId).populate('investments')
      res.status(200).json({
        success: true,
        data: user.investments ? user.investments : []
      })
    } catch (error) {
      console.log(error)
      res.status(404).send('An error occured')
    }
  }

}
