import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexForBatch1767008046838 implements MigrationInterface {
    name = 'AddUniqueIndexForBatch1767008046838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_code_unique_when_not_deleted" ON "pharmasys"."batch" ("batch_code") WHERE "deleted_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_code_unique_when_not_deleted"`);
    }

}
