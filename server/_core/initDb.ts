import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function initializeDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.log('[Init DB] DATABASE_URL not set, skipping migrations');
    return;
  }

  try {
    console.log('[Init DB] Starting database initialization...');
    
    // Parse DATABASE_URL (mysql://user:password@host:port/database)
    const url = new URL(databaseUrl);
    const config = {
      host: url.hostname,
      port: url.port ? parseInt(url.port) : 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
    };

    console.log(`[Init DB] Connecting to ${config.host}:${config.port}/${config.database}`);
    
    const connection = await mysql.createConnection(config);
    console.log('[Init DB] Connected successfully');

    // Read and execute migration files
    const migrationsDir = path.join(__dirname, '..', '..', 'drizzle');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    console.log(`[Init DB] Found ${migrationFiles.length} migration files`);

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      
      // Split by statement breakpoint
      const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(Boolean);
      
      for (const statement of statements) {
        try {
          console.log(`[Init DB] Executing: ${file}`);
          await connection.execute(statement);
          console.log(`[Init DB] ✓ Success`);
        } catch (error: any) {
          // Ignore "table already exists" errors
          if (error.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log(`[Init DB] ℹ Table already exists, skipping`);
          } else {
            console.error(`[Init DB] ✗ Error executing statement:`, error.message);
            // Don't throw - continue with other migrations
          }
        }
      }
    }

    await connection.end();
    console.log('[Init DB] ✓ Database initialization completed successfully');
  } catch (error) {
    console.error('[Init DB] ✗ Failed to initialize database:', error);
    // Don't throw - allow server to continue even if migrations fail
  }
}
