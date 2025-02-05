import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultCategories = [
    { name: 'Food & Dining', color: '#FF5733', icon: '🍽️' },
    { name: 'Transportation', color: '#33FF57', icon: '🚗' },
    { name: 'Housing', color: '#3357FF', icon: '🏠' },
    { name: 'Utilities', color: '#FF33F5', icon: '💡' },
    { name: 'Entertainment', color: '#33FFF5', icon: '🎬' },
    { name: 'Shopping', color: '#F5FF33', icon: '🛍️' },
    { name: 'Healthcare', color: '#FF3333', icon: '🏥' },
    { name: 'Education', color: '#33FF33', icon: '📚' },
    { name: 'Personal Care', color: '#3333FF', icon: '💅' },
    { name: 'Income', color: '#33FF57', icon: '💰' },
  ];

  console.log('Seeding default categories...');

  // Categories will be created when a user registers
  console.log('Default categories ready for user registration');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 