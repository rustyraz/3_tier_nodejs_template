import express from 'express';

const userController = express.Router();

userController.get('/', (req, res) =>{
    res.status(200).json({
        status: 'User Constroller API call successful'
    });
});

export default userController;