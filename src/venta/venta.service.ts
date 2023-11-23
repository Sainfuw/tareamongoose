import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto } from 'src/producto/schemas/producto.schema';
import { CreateVentaDto } from './dto/create-venta.dto';
import { VentaMapper } from './mapper/venta.mapper';
import { Venta } from './schemas/venta.schema';

@Injectable()
export class VentaService {
  constructor(
    @InjectModel(Venta.name)
    private ventaModel: Model<Venta>,

    @InjectModel(Producto.name)
    private productoModel: Model<Producto>,
  ) {}

  async findAll() {
    const resultado = await this.ventaModel.find().populate('producto');
    return VentaMapper.toDtoList(resultado);
  }

  async create(createVenta: CreateVentaDto) {
    const producto = await this.productoModel.findById(createVenta.productoId);

    if (!producto) throw new BadRequestException();

    const ventaSchema = VentaMapper.toSchema(
      createVenta,
      producto,
      producto._id,
    );

    const resultado = await this.ventaModel.create(ventaSchema);

    const withRelations = await this.ventaModel
      .findById(resultado._id)
      .populate('producto');

    return VentaMapper.toDto(withRelations);
  }

  // Utilizar una operación de agregación de MongoDB para generar un reporte que muestre el total de ventas por categoría de producto para el mes actual. El reporte debe incluir la categoría y el total de ingresos generados por esa categoría.
  // {
  //   "telefonos": 2000000,
  //   "celulares": 5000000,
  //   "computadores": 10000000
  // }

  async reporteCategorias() {
    const mes = new Date().getMonth() + 1;
    const resultado = await this.ventaModel.aggregate([
      { $match: { $expr: { $eq: [{ $month: '$fecha' }, mes] } } },
      {
        $lookup: {
          from: 'producto',
          localField: 'producto',
          foreignField: '_id',
          as: 'producto',
        },
      },
      { $group: { _id: '$producto.categoria', ventas: { $sum: '$total' } } },
    ]);
    return VentaMapper.toReport(resultado);
  }
}
