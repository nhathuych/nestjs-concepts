import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnsFromCamelCaseToSnakeCase1756266400459 implements MigrationInterface {
  name = 'RenameColumnsFromCamelCaseToSnakeCase1756266400459'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // users
    await queryRunner.renameColumn('users', 'fullName', 'full_name');
    await queryRunner.renameColumn('users', 'createdAt', 'created_at');
    await queryRunner.renameColumn('users', 'updatedAt', 'updated_at');

    // posts
    await queryRunner.renameColumn('posts', 'userId', 'user_id');
    await queryRunner.renameColumn('posts', 'createdAt', 'created_at');
    await queryRunner.renameColumn('posts', 'updatedAt', 'updated_at');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.renameColumn('users', 'full_name', 'fullName');
    await queryRunner.renameColumn('users', 'created_at', 'createdAt');
    await queryRunner.renameColumn('users', 'updated_at', 'updatedAt');

    await queryRunner.renameColumn('posts', 'user_id', 'userId');
    await queryRunner.renameColumn('posts', 'created_at', 'createdAt');
    await queryRunner.renameColumn('posts', 'updated_at', 'updatedAt');
  }
}
