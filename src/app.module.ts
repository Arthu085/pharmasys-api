import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, RoleModule],
})
export class AppModule {}
