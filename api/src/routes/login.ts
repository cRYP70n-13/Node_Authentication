import { Router } from 'express';
import { catchAsync, guest } from '../middlewares';
import { User } from '../models';
import { validate, loginSchema } from '../validations';
import { Unauthorized } from '../errors';
import { logIn, logOut } from '../auth';
import { auth } from '../middlewares'

const router = Router();

router.post('/logout', auth, catchAsync(async (req, res) => {
  await logOut(req, res);

  res.json({
    message: 'Logout OK 🚀'
  });
}))

router.post('/login', guest, catchAsync(async (req, res) => {
  await validate(loginSchema, req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email })

  if (!user || !(await user.mathcesPassword(password))) {
    throw new Unauthorized('Incorrect Username or Password');
  }

  logIn(req, user.id);

  res.json({
    message: 'Logout, OK 🚀'
  })
}))

export default router;