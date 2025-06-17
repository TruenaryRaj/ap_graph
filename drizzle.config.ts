import 'dotenv/config';

const DATABASE_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export default ({
  out: './src/db/migrations',
  schema: './src/db/schema',
  dialect: 'mysql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
