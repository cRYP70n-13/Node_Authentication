import { Router } from 'express';
import { logIn } from '../auth';
import { BadRequest } from '../errors';
import { guest, catchAsync } from '../middlewares';
import { User } from '../models';
import { registerSchema, validate } from '../validations';

const router = Router();

router.post('/register', guest, catchAsync (async (req, res) => {

  // Validate the incomming user
  await validate(registerSchema, req.body);

  // Fetching the user data from the body
  const { email, name, password } = req.body;

  // Check if the email is already toked by one of the users
  const found = await User.exists({ email });

  // Throw error if yes
  if (found) {
    throw new BadRequest('Invalid Email');
  }

  // Else create a new one
  const user = await User.create(email, name, password);

  logIn(req, user.id);

  // Send the response
  res.json({
    message: 'OK'
  })
}));

// Testing route
router.get('/register', (req, res) => {
  res.json({
    message: 'OK !!'
  })
})

export default router;