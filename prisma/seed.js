import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
   const file = resolve('prisma', 'evento.json');
   const seed = JSON.parse(readFileSync(file)); 

   
    for(const seman of seed.Eventos){
      await prisma.eventos.create({
        data: seman,
          
      
    });

    
  }
  for(const editall of seed.Editais){
      await prisma.editais.create({
        data: editall,
          
      
    });
    console.log(editall);
    }
  await prisma.user.create({
    data: {
      Nome: 'Chico',
      Email: 'chicohaikal@gmail.com',
      Senha: '123456',
      TipoUser: 'Admin',
      DataCadastro: new Date(),
      Ativo: true,
    },
  })
};
  
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });