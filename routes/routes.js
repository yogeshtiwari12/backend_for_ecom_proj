import express from 'express';
const router = express.Router();
import {login,signup,logout} from '../controllers/methods.js';
import verfytoken from '../jwt_verify/verify_token.js';

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout',verfytoken,logout);


export default router;

