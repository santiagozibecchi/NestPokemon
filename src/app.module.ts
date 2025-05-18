import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig } from './config/env.config';

import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    // Configuracion de variables de entorno
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: JoiValidationSchema,
    }),
    // Configuracion de archivos estaticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Coneccion a MongoDB
    MongooseModule.forRoot(process.env.MONGODB!, {
      dbName: 'pokemonsdb' // Nombre de la base de datos: tambien se puede pasar por variable de entorno
    }),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {}