import {   Entity,    } from 'typeorm';
import { GenericTable } from './generic.entity';


@Entity()
export class DataTable extends GenericTable {}