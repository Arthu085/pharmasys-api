import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/modules/user/entities/role.entity';

const hashedPassword = bcrypt.hashSync('123456', 10);

export function getRolesSeed(roleId: RoleEntity) {
  return [
    {
      name: 'ADMIN',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: roleId,
    },
  ];
}
