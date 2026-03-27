const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const collectionsToDrop = [
  'benches',
  'billingmodels',
  'companies',
  'contracts',
  'departments',
  'employees',
  'forecastreports',
  'invoices',
  'margins',
  'margintrends',
  'resources',
  'revenues',
  'risks',
  'users'
];

const cleanupDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Connected to MongoDB: ${conn.connection.name}`);

    const db = conn.connection.db;
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map(c => c.name);

    console.log('Dropping old collections...');
    let droppedCount = 0;

    for (const coll of collectionsToDrop) {
      if (existingNames.includes(coll)) {
        await db.dropCollection(coll);
        console.log(`  - Dropped collection: ${coll}`);
        droppedCount++;
      }
    }

    if (droppedCount > 0) {
      console.log(`\n✅ Cleanup complete. Dropped ${droppedCount} old collections.`);
    } else {
      console.log('\n✅ No old collections found to drop. Your database is already clean.');
    }

    process.exit();
  } catch (err) {
    console.error('❌ Cleanup failed:', err);
    process.exit(1);
  }
};

cleanupDB();