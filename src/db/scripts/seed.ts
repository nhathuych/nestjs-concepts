import { AppDataSource } from '../data-source';
import { User, UserRole } from 'src/modules/users/user.entity';
import * as bcrypt from 'bcrypt';
import 'dotenv/config'

const createAdmin = async () => {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const email = 'admin@gmail.com';

  const existingAdmin = await userRepo.findOne({ where: { email } });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    await AppDataSource.destroy();
    return;
  }

  const hashedPassword = await bcrypt.hash('123456', Number(process.env.SALT_ROUNDS || 10));
  const admin = userRepo.create({
    email,
    fullName: 'System Administrator',
    password: hashedPassword,
    role: UserRole.ADMIN,
  });
  await userRepo.save(admin);

  console.log(`✅ Admin user created successfully.`);
  await AppDataSource.destroy();
}

createAdmin().catch((err) => {
  console.error('❌ Error seeding admin user:', err);
  AppDataSource.destroy();
});
