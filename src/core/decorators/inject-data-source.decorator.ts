import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const InjectDataSource = () => Inject(DataSource);
