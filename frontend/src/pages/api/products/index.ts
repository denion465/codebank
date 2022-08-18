/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NextApiRequest, NextApiResponse } from 'next';

import { Product, products } from '../../../model';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products);
}
