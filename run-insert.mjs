import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function insertEmployees() {
  // Obter a URL de conexão do banco de dados
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('[Insert] Erro: DATABASE_URL não está definida');
    process.exit(1);
  }

  console.log('[Insert] Conectando ao banco de dados...');
  
  const connection = await mysql.createConnection(databaseUrl);

  try {
    // Ler o arquivo SQL
    const sqlFile = path.join(process.cwd(), 'insert-employees.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('[Insert] Executando SQL...');
    
    // Dividir o SQL em múltiplas queries (se houver)
    const queries = sql.split(';').filter(q => q.trim());
    
    for (const query of queries) {
      if (query.trim()) {
        try {
          await connection.execute(query);
          console.log('[Insert] ✓ Query executada com sucesso');
        } catch (error) {
          console.error('[Insert] ✗ Erro ao executar query:', error.message);
        }
      }
    }

    console.log('[Insert] Inserção concluída com sucesso!');
  } catch (error) {
    console.error('[Insert] Erro:', error);
  } finally {
    await connection.end();
  }
}

insertEmployees().catch(console.error);
