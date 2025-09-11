import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumnsFromCamelCaseToSnakeCase1757564181061 implements MigrationInterface {
  name = 'RenameColumnsFromCamelCaseToSnakeCase1757564181061'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "fullName"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "user_id" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "users" ADD "fullName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "userId" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }
}
