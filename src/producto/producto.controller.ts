import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductoService } from './producto.service';

@Controller()
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get('/listaProductos')
  async findAll() {
    const resultado = await this.productoService.findAll();
    return resultado;
  }

  @Post('registrarProducto')
  @ApiBody({ type: CreateProductoDto, description: 'Datos del Producto' })
  async create(@Body() createProductoDto: CreateProductoDto) {
    return await this.productoService.create(createProductoDto);
  }
}
