import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../model/model.js";
import jwt from "jsonwebtoken";

const jwtSecret = "yogesh123"; // Renamed for clarity

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            name: newUser.name,
            email: newUser.email,

        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDetails = await User.findOne({ email });
        if (!userDetails) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, userDetails.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password not matched" });
        }

        jwt.sign({ id: userDetails._id }, jwtSecret, { expiresIn: "1h" }, (error, token) => {
            if (error) throw error;

            res.cookie('token', token ).json({
                message: "User logged in successfully",
                name: userDetails.name,
                token: token, 
                email: email,
            });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const logout = (req, res) => {
    const t_bucket = new Set();
    let token = req.headers['authorization'];
    if (token) {
        t_bucket.add(token);
        res.json({ message: 'User logged out successfully' })
    }
    else {
        res.status(401).json({ message: 'No token provided' });
    }
}

