import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexForCodeAndDelete1762907078407 implements MigrationInterface {
    name = 'AddUniqueIndexForCodeAndDelete1762907078407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_5e8b8a4b61649c6fa421258fae"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" DROP CONSTRAINT "UQ_eb4dd13579b6026ed0449f7a244"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_stoc_location_code_unique_when_not_deleted" ON "pharmasys"."stock_location" ("code") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_5e8b8a4b61649c6fa421258fae" ON "pharmasys"."stock_location" ("name", "code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_5e8b8a4b61649c6fa421258fae"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_stoc_location_code_unique_when_not_deleted"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" ADD CONSTRAINT "UQ_eb4dd13579b6026ed0449f7a244" UNIQUE ("code")`);
        await queryRunner.query(`CREATE INDEX "IDX_5e8b8a4b61649c6fa421258fae" ON "pharmasys"."stock_location" ("name", "code") `);
    }

}
