export class SecretCode {
  getDatabaseUri() {
    const uri = process.env.DATABASE_URL;
    if (!uri) {
      throw new Error('Database URI not found');
    } else {
      return uri;
    }
  }
}
