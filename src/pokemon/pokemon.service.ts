import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`)
      }
      throw new InternalServerErrorException('Cant create Pokemon, check server logs')
    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    const normalizedTerm = term.toLowerCase().trim();
    const pokemon = await this.tryFindStrategies(normalizedTerm);
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id|name|no '${term}' not found`);
    }
    return pokemon;
  }

  private async tryFindStrategies(term: string): Promise<Pokemon | null> {
    const strategies = [
      async () => !isNaN(+term) ? await this.pokemonModel.findOne({ no: term }) : null,
      async () => isValidObjectId(term) ? await this.pokemonModel.findById(term) : null,
      async () => await this.pokemonModel.findOne({ name: term })
    ];
    for (const strategy of strategies) {
      const result = await strategy(); // patrón "short-circuit" 
      if (result) return result;
    }
    return null;
  }

  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
