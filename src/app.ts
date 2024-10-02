import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { errorHandler } from './middleware/errorHandler';
import { bigintMiddleware } from './middleware/bigintMiddleware';
import dealsRoutes from './routes/deals-route';
import chart from './routes/shopkeeper.views-route';

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
    json: (context: any) => JSON.stringify(context)
  }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/deals', dealsRoutes);

app.use('/', chart);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});