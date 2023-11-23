import { CreateProductoDto } from '../dto/create-producto.dto';
import { ProductoDto } from '../dto/producto.dto';
import { Producto } from '../schemas/producto.schema';

export class ProductoMapper {
  static toDto(schema: Producto): ProductoDto {
    const dto = new ProductoDto();
    dto.nombre = schema.nombre;
    dto.categoria = schema.categoria;
    dto.precio = schema.precio;
    return dto;
  }

  static toDtoList(schemas: Producto[]): ProductoDto[] {
    return schemas.map((schema) => this.toDto(schema));
  }

  static toSchema(dto: CreateProductoDto): Producto {
    const schema: Producto = new Producto();
    schema.nombre = dto.nombre;
    schema.categoria = dto.categoria;
    schema.precio = dto.precio;
    return schema;
  }
}
