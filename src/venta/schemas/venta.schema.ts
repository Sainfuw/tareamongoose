import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { Producto } from 'src/producto/schemas/producto.schema';

@Schema({ collection: 'venta' })
export class Venta {
  @Prop({ type: Types.ObjectId, ref: 'Producto' })
  producto: Producto | ObjectId;

  @Prop({ name: 'cantidad' })
  cantidad: number;

  @Prop({ name: 'total' })
  total: number;

  @Prop({ name: 'fecha' })
  fecha: Date;
}

export const VentaSchema = SchemaFactory.createForClass(Venta);
