// import {
//   MigrationInterface,
//   QueryRunner,
//   Table,
//   TableForeignKey,
// } from 'typeorm';

// export class CreateTasks1625784598262 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'tasks',
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
//             isUnique: true,
//           },
//           {
//             name: 'prevision_date',
//             type: 'date',
//           },
//           {
//             name: 'started',
//             type: 'timestamp',
//           },
//           {
//             name: 'finished',
//             type: 'timestamp',
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//           {
//             name: 'user_id',
//             type: 'int',
//           },
//           {
//             name: 'project_id',
//             type: 'int',
//           },
//         ],
//       }),
//     );

//     await queryRunner.createForeignKey(
//       'tasks',
//       new TableForeignKey({
//         name: 'TaskUser',
//         columnNames: ['user_id'],
//         referencedColumnNames: ['id'],
//         referencedTableName: 'users',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//       }),
//     );

//     await queryRunner.createForeignKey(
//       'tasks',
//       new TableForeignKey({
//         name: 'TaskProject',
//         columnNames: ['project_id'],
//         referencedColumnNames: ['id'],
//         referencedTableName: 'projects',
//         onDelete: 'SET NULL',
//         onUpdate: 'CASCADE',
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropForeignKey('tasks', 'TaskUser');
//     await queryRunner.dropForeignKey('tasks', 'TaskProject');
//     await queryRunner.dropTable('tasks');
//   }
// }
