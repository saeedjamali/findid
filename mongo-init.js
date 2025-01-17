// mongo-init.js
db = db.getSiblingDB('findid_db');

// Create user with necessary permissions
db.createUser({
  user: 'findid_user',
  pwd: process.env.MONGO_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: 'findid_db'
    }
  ]
});
