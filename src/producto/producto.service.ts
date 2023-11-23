import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductoMapper } from './mapper/producto.mapper';
import { Producto } from './schemas/producto.schema';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name)
    private productoModel: Model<Producto>,
  ) {}

  async findAll() {
    const resultado = await this.productoModel.find();
    return ProductoMapper.toDtoList(resultado);
  }

  async create(producto: CreateProductoDto) {
    const existente = await this.productoModel.find({
      nombre: producto.nombre,
    });

    if (existente) {
      throw new BadRequestException();
    }

    const resultado = await this.productoModel.create(producto);
    return ProductoMapper.toDto(resultado);
  }
}
