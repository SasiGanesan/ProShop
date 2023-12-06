import asyncHandler from '../middleware/asyncHandler.js';
import User from '../Models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc   Auth user & get token
//@route  POST /api/products/login
//@access Public
const authUser = asyncHandler(async(req,res)=>{
    const { email, password} = req.body
   
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        generateToken(res,user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin ,
            
            });
         } else {
                res.status(401)
                throw new Error('Invalid email or password');
            }
});


//@desc   Register
//@route  POST /api/users
//@access Public
const registerUser = asyncHandler(async(req,res)=>{
    const {name ,email,password }=req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }
    const user =await User.create({
        name,email,password
    });

    if(user){

        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }
});


//@desc   Logout user/ clear cookie
//@route  POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({message: 'Logged out successfully'})
});


//@desc   Logout user/ clear cookie
//@route  GET /api/users/profile
//@access Public
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }

    res.send('get user profile');
});

//@desc   Update user profile
//@route  PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
    
});


//@desc   Get users 
//@route  GET /api/users
//@access Private/admin
const getUsers = asyncHandler(async(req,res)=>{
    res.send('get users');
});

//@desc   Get users by ID
//@route  GET /api/users/:id
//@access Private/admin
const getUsersByID = asyncHandler(async(req,res)=>{
    res.send('get user by id');
});

//@desc   Delete users 
//@route  DELETE /api/users/:id
//@access Private/admin
const deleteUsers = asyncHandler(async(req,res)=>{
    res.send('delete users');
});

//@desc   Update user 
//@route  PUT /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async(req,res)=>{
    res.send('update user');
});


export{
    authUser,
    registerUser,logoutUser,
    getUserProfile,updateUserProfile,
    getUsers,deleteUsers,getUsersByID,updateUser
};