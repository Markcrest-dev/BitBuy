const { Client } = require('pg');

// Test the connection string from .env
const connectionString = "postgresql://postgres.sjhxdylepgoohepaupco:MdarWfMuypmU6dmg@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true";

console.log('Testing database connection...\n');

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    console.log('Attempting to connect...');
    await client.connect();
    console.log('✅ Connection successful!\n');

    console.log('Testing query...');
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query successful!');
    console.log('Current time from database:', result.rows[0].now);

    // Test if we can query the User table
    console.log('\nTesting User table access...');
    const userCount = await client.query('SELECT COUNT(*) FROM "User"');
    console.log('✅ User table accessible!');
    console.log('User count:', userCount.rows[0].count);

  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error name:', error.name);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.message.includes('password authentication failed')) {
      console.error('\n⚠️  PASSWORD IS INCORRECT!');
      console.error('Please get the correct password from Supabase dashboard');
    }

    if (error.message.includes('no pg_hba.conf entry')) {
      console.error('\n⚠️  SSL/CONNECTION ISSUE!');
      console.error('The database might require different SSL settings');
    }
  } finally {
    await client.end();
    console.log('\nConnection closed.');
  }
}

testConnection();
