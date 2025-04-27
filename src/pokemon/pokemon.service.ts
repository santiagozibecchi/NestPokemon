import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

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
      this.handleExeptions(error)
    }

  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v')
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

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto)
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      };
    } catch (error) {
      this.handleExeptions(error)
    }

  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({
      _id: id,
    })
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id: '${id}' not found`)
    }
    return;
  }

  // uncontrolled exceptions
  private handleExeptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in DB ${JSON.stringify(error.keyValue)}`)
    }
    throw new InternalServerErrorException('Cant create Pokemon, check server logs')
  }
}
