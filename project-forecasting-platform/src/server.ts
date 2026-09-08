import express from 'express';
import usersRoutes from '../modules/users/src/routes/users.routes';
import profilesRoutes from '../modules/profiles/src/routes/profiles.routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/users', usersRoutes);
app.use('/api/profiles', profilesRoutes);

const PORT = process.env.PORT ?? 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`project-forecasting-platform listening on port ${PORT}`);
  });
}

export default app;
