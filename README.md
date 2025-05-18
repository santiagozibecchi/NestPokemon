# Ejecutar en desarrollo
1. clocar el repo
2. Ejecutar
```
yarn install
```

3. Instalar nest 
```
npm i -g @nestjs/cli
```

4. Levantar base de datos
```
docker-componse up -d
```

5. Reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```

6. Correr el proyecto de nest 
```
yarn start:dev
```

## Stack
mongoDB
nestjs