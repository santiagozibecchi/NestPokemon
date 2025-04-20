import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Coneccion a MongoDB
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule
  ],
})
export class AppModule {}