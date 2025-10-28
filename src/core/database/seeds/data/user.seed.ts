import * as bcrypt from 'bcrypt';
import { Role } from 'src/modules/user/entities/role.entity';

const hashedPassword = bcrypt.hashSync('123456', 10);

export function getRolesSeed(roleId: Role) {
  return [
    {
      name: 'ADMIN',
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: roleId,
    },
  ];
}
