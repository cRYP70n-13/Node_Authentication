import { Router } from 'express';
import { auth, catchAsync } from '../middlewares';
import { User } from '../models';

const router = Router();

router.get('/home', auth, catchAsync(async (req, res) => {
  const user = await User.findById(req.session!.userId).select('-password -__V');
  res.json(user);
}))

export { router as home };