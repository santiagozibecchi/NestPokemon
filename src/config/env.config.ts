// conf para los modulos de nest
export const EnvConfig = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3000,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
})