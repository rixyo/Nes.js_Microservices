import { DataSource } from 'typeorm';
export const dataSourceProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try {
        const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5434,
          username: 'roixy',
          password: 'mysecret',
          database: 'User',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
          cache: true,
        });
        return dataSource.initialize();
      } catch (error) {
        console.log(error);
      }
    },
  },
];
