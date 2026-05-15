import express from 'express';
import authenticate from '../middleware/authentication.middleware';
import authorize from '../middleware/authorization.middleware';
import { Customer, validate } from '../models/customer.model';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/api/customers', async (req: Request, res: Response) => {
  const customer = await Customer.find().sort({ surname: 1 });
  res.send(customer);
});

router.get('/api/customers/:id', async (req: Request, res: Response) => {
  const customerId = req.params.id;
  const customer = await Customer.findById(customerId);

  if (!customer) res.status(404).send('The customer does not exist.');
  if (!validate(req.body)) {
    res.status(400).send('Data is malformed.');
  }

  res.send(customer);
});

router.post('/api/customers/', [authenticate, authorize], async (req: Request, res: Response) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send('Data is malformed.');
  }

  const customer = new Customer({
    name,
    surname,
  });

  await customer.save();

  res.send(customer);
});

router.put(
  '/api/customers/:id',
  [authenticate, authorize],
  async (req: Request, res: Response) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    const name = req.body.name;
    const surname = req.body.surname;

    const { error } = validate(req.body);
    if (!customer) res.status(404).send('The customer does not exist.');
    if (error) {
      res.status(400).send('Data is malformed.');
    }

    customer!.name = name;
    customer!.surname = surname;

    await customer!.save;

    res.send(customer);
  },
);

router.delete(
  '/api/customers/:id',
  [authenticate, authorize],
  async (req: Request, res: Response) => {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) res.status(404).send('The customer does not exist.');
    await Customer.deleteOne({_id: customerId});

    res.send(customerId);
  },
);

export default router;
