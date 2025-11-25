import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    console.log(users)
    res.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

// OTHER ENDPOINTS TO ADD:

// GET a specific user
// GET all users for a specific complex
// POST a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const result = await prisma.user.create({
      data: req.body
    })
    res.json({
      status: "Ok",
      message: "User successfully created in database.",
      result: "Result of request: " + " " + result
    })
  }
  catch(error: any){
    res.status(400).json({
      status: "Bad Request",
      message: "There was an error creating the user in the database",
      error: error.message,
    })
  }
})
// PUT a user
// DELETE a user

export default router;
