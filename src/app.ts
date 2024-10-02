import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import dealsRoutes from './routes/deals-route';
import { bigintMiddleware } from './middleware/bigintMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandler);
app.use(bigintMiddleware);

app.use('/api/deals', dealsRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});