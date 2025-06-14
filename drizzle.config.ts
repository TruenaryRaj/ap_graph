import 'dotenv/config';

export default ({
  out: './src/db/migrations',
  schema: './src/db/schema',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
