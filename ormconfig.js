module.exports = {
  name: 'default',
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  database: `${process.env.DB_NAME}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  entities: [
    `${__dirname}/packages/server/src/modules/**/infra/typeorm/models/*.ts`,
  ],
  migrations: [
    `${__dirname}/packages/server/src/shared/infra/typeorm/migrations/*.ts`,
  ],
  cli: {
    migrationsDir: [
      `${__dirname}/packages/server/src/shared/infra/typeorm/migrations`,
    ],
  },
};
