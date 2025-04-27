import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  /**
   * La clave imports permite componer módulos, es decir, usar funcionalidades que han sido definidas en otros módulos.
   * NestJS es altamente modular, y los módulos pueden depender unos de otros.
   */
  imports: [
    /**
     * Para registrar un modelo de Mongoose
     * Esto es útil cuando deseas encapsular la lógica de una entidad
     * NestJS ahora sabe cómo interactuar con la colección pokemons de MongoDB desde este módulo.
     * Esto permite que puedas inyectar el modelo Pokemon en tu servicio (PokemonService):
     */
    MongooseModule.forFeature([
      {
        name: Pokemon.name, // nombre del modelo.
        schema: PokemonSchema, // clase decorada como entidad (@Schema())
      }
    ])
  ],
  exports: [MongooseModule]
})
export class PokemonModule { }
