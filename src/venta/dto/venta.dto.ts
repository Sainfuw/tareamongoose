import { Producto } from 'src/producto/schemas/producto.schema';

export class VentaDto {
  producto: Producto;
  cantidad: number;
  total: number;
  fecha: Date;
}
