/**
 * Seed data: 59 colaboradores pré-cadastrados em ordem alfabética.
 * Cada colaborador é criado sem treinamentos — o usuário pode adicioná-los depois.
 * O seed só é executado uma vez; a flag 'training-manager:seeded' impede re-execução.
 */

import type { Employee } from './types';

const SEED_NAMES: string[] = [
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

/** Generate a simple unique ID */
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

const STORAGE_PREFIX = 'training-manager:';
const SEEDED_FLAG = STORAGE_PREFIX + 'seeded';

/**
 * Seeds localStorage with the 59 employees if not already done.
 * Returns true if seed was applied, false if it was already present.
 */
export function seedEmployees(): boolean {
  if (localStorage.getItem(SEEDED_FLAG)) {
    return false;
  }

  // Sort alphabetically (already sorted above, but ensure it)
  const sorted = [...SEED_NAMES].sort((a, b) =>
    a.localeCompare(b, 'pt-BR', { sensitivity: 'base' })
  );

  for (const name of sorted) {
    const employee: Employee = {
      id: generateId(),
      name,
      role: '',
      trainings: [],
    };
    localStorage.setItem(
      STORAGE_PREFIX + `employee:${employee.id}`,
      JSON.stringify(employee)
    );
  }

  localStorage.setItem(SEEDED_FLAG, 'true');
  return true;
}
