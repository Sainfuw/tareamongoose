import { ApiProperty } from '@nestjs/swagger';

export class CreateVentaDto {
  @ApiProperty({
    example: '655e721b4aeb59aa2b78fbe7',
    description: 'Id del Producto',
  })
  productoId: string;

  @ApiProperty({ example: '10', description: 'Cantidad de productos vendidos' })
  cantidad: number;
}
