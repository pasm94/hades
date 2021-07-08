// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export class CreateProjects1625707677532 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'projects',
//         columns: [
//           {
//             name: 'id',
//             type: 'int',
//             isPrimary: true,
//             isGenerated: true,
//             generationStrategy: 'increment',
//           },
//           {
//             name: 'name',
//             type: 'varchar',
//           },
//           {
//             name: 'status',
//             type: 'varchar',
//           },
//           {
//             name: 'description',
//             type: 'varchar',
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//         ],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropTable('projects');
//   }
// }
