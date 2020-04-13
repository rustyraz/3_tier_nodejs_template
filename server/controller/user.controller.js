import express from 'express';
import { User } from '../database/models';
import sha256 from 'sha256';

const userController = express.Router();

/***
 * GET/
 * retrieve and return all users in the User model
*/
userController.get('/', (req, res) =>{
    User.find({}, (err, result) =>{
        res.status(200).json({
            data: result
        });
    });    
});

/***
 * GET/:id
 * retrieve and return a user using the ID in the User model
*/
userController.get('/:id', (req, res) =>{
    const id = req.params.id; //DO SOME VALIDATION HERE
    User.findById(id, (err, result) =>{
        res.status(200).json({
            data: result
        });
    });
});

/***
 * POST/
 * Add a new User to the database
 * Future improvements will be done like VALIDATION
*/
userController.post('/register', (req, res) => {
    //we need to do a validation
    const { email, password } = req.body;

    const userData = {
        email,
        hashedPassword: sha256(password) //we will use a better module for this
    };

    const newUser = new User(userData);

    newUser.save()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                error: true,
                message: "unable to save users data into the database",
                errorFound: err
            });
        });
});

/***
 * PUT/:id
 * update using the ID in the User model
*/
userController.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    User.updateOne({_id: id}, {name:name}, (err, result) => {
        if(err){
            res.status(400).json({
                error: true,
                message: "Error occured while trying to update",
                err
            });
        }else{
            res.status(200).json({
                success: true,
                data: result
            });
        }
    });
});


/***
 * DELETE/:id
 * delete user by ID in the User model
*/

userController.delete('/:id', (req, res)=>{
    const id = req.params.id; // VALIDATE IF USER CAN DELETE AND IF THIS ID IS VALID
    User.deleteOne({_id:id}, (err, result) => {
        if(err){
            res.status(400).json({
                error: true,
                message: "Error occured while trying to delete",
                err
            });
        }else{
            res.status(200).json({
                success: true,
                data: result
            });
        }

    });
});

export default userController;