import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
   const file = resolve('prisma', 'evento.json');
   const seed = JSON.parse(readFileSync(file, 'utf-8')); 

   
    for(const seman of seed.eventos){
      await prisma.eventos.create({
        data: seman,
          
      
    });

    for(const editall of seed.editais){
      await prisma.editais.create({
        data: editall,
          
      
    });
    }
  }
}
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });