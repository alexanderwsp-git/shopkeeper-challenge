import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';
import { bigintMiddleware } from './middleware/bigintMiddleware';
import dealsRoutes from './routes/deals-route';
import shopkeeperViews from './routes/shopkeeper.views-route';
import shopkeeperApi from './routes/shopkeeper.api-route';

import JSONbig from 'json-bigint';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bigintMiddleware);
app.use(errorHandler);

app.engine('hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  extname: '.hbs',
  helpers: {
    toJson: (context: any) => JSON.stringify(context),
    toJsonBig: (context: any) => JSONbig.stringify(context),
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/deals', dealsRoutes);

app.use('/', shopkeeperViews);
app.use('/api/v1/shopkeeper', shopkeeperApi);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});