import mysql from 'mysql2/promise';

const employees = [
  'Adryan Gabriel Alves',
  'Alexandre Francisco Souza Da Silva',
  'Alexandre Vinicius Santos',
  'Alexandro Souza Dos Santos',
  'Algari Feitosa Cavalcante',
  'Alison Valbert',
  'Amós Silvestre Dos Santos',
  'Ana Paula De Andrade Santos',
  'André Neres Santos',
  'Antônio Dizio Da Silva',
  'Antonio Marcos Alves De Souza',
  'Carlos Alberto Dos Santos',
  'Clebisson Dos Santos',
  'Cleisson Cardoso Dantas',
  'Cleverton De Andrade Santos',
  'David Lune Conceição',
  'Edidelson Santos',
  'Eduardo Dos Santos Oliveira',
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
  'Igor Vinicius Dos Santos Silva',
  'Ivanilson Menezes Batista',
  'Izaias Da Paz Santos',
  'Jeizon Nunes Santos',
  'Jessica Alves De Souza',
  'João Pedro Da Silva Santos',
  'Joelisson Dos Santos',
  'Jose Alisson De Lima Morais',
  'José Carlos Dos Santos',
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
  'Paulo Americo Azevedo Filho',
  'Rafael Santos Bispo',
  'Reginaldo Feritas Morais',
  'Robson Santos Da Silva',
  'Shairwandler Santos Santana',
  'Suênia Barreto de Santana',
  'Thiago Freire De Campos',
  'Walisson Tavares Dos Santos',
  'Welber Guilherme Dos Santos',
  'Wevicles Oliveira Batista Dos Santos',
  'Yago Santos Cruz',
];

async function seedDatabase() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    for (const name of employees) {
      const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
      await connection.execute(
        'INSERT INTO employees (id, name, role, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
        [id, name, '']
      );
    }
    console.log(`✅ Successfully seeded ${employees.length} employees`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await connection.end();
  }
}

seedDatabase();
