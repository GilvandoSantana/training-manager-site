import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { employees } from './drizzle/schema.js';

const employeesList = [
  'Adryan Gabriel Alves',
  'Alexandre Francisco Souza Da Silva',
  'Alexandre Vinicius Santos',
  'Alexandro Souza Dos Santos',
  'Algary Feitosa Cavalcante',
  'Alison Valbert',
  'Amós Silvestre Dos Santos',
  'André Neres Santos',
  'Antônio Dizio Da Silva',
  'Antonio Marcos Alves De Souza',
  'Carlos Alberto Dos Santos',
  'Clebisson Dos Santos',
  'Cleisson Cardoso Dantas',
  'Cleverton De Andrade Santos',
  'David Lune Conceição',
  'Edidelson Santos',
  'Eraldo Pereira Santos',
  'Erivaldo Batista Santos Junior',
  'Esdras Phillip',
  'Everton Mendes Soares',
  'Francisco Cicero Da Silva',
  'Gabriel Dos Santos Costa',
  'Gabriel Santana Dos Santos',
  'Gabriel Santana Nogueira',
  'Helyel Santana Silva',
  'Humberto Rodrigues Dos Santos Neto',
  'Ivanilson Menezes Batista',
  'Izaias Da Paz Santos',
  'Jeizon Nunes Santos',
  'João Pedro Da Silva Santos',
  'Joelisson Dos Santos',
  'Jose Alisson De Lima Morais',
  'José Vanderley Francisco',
  'Josivan Da Silva Lima',
  'Luiz Carlos Maia Santos',
  'Magno Dos Santos',
  'Manoel Messias Dos Santos',
  'Marcelo Santos Santana',
  'Marcus Vinicius Gomes De Azevedo',
  'Mateus Souza Da Hora',
  'Matheus Santos Gomes',
  'Michael Alysson Jheckson Santos Silva',
  'Nathan Nascimento Santos',
  'Rafael Santos Bispo',
  'Robson Santos Da Silva',
  'Shairwandler Santos Santana',
  'Thiago Freire De Campos',
  'Walisson Tavares Dos Santos',
  'Welber Guilherme Dos Santos',
  'Wevicles Oliveira Batista Dos Santos',
  'Yago Santos Cruz'
];

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  console.log('[Seed] Iniciando inserção de funcionários...');

  for (const name of employeesList) {
    try {
      await db.insert(employees).values({
        name,
        role: ''
      });
      console.log(`[Seed] ✓ ${name}`);
    } catch (error) {
      console.error(`[Seed] ✗ ${name}:`, error.message);
    }
  }

  console.log('[Seed] Inserção concluída!');
  await connection.end();
}

seed().catch(console.error);
