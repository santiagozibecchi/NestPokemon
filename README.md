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

5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en el ```.env```

7. Correr el proyecto de nest 
```
yarn start:dev
```

8. Reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```


## Stack
mongoDB
nestjs