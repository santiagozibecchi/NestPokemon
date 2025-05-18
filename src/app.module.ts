import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfig } from './config/env.config';

import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    // Configuracion de variables de entorno
    ConfigModule.forRoot({
      load: [EnvConfig]
    }),
    // Configuracion de archivos estaticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Coneccion a MongoDB
    MongooseModule.forRoot(process.env.MONGODB!),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {}