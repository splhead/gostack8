import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Testando da Silva',
    email: 'diego@rocket.com.br',
    password_hash: '12098u34534',
  });

  return res.json(user);
});

export default routes;
