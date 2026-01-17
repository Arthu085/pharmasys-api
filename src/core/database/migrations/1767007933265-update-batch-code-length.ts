import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBatchCodeLength1767007933265 implements MigrationInterface {
    name = 'UpdateBatchCodeLength1767007933265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fbb92aef269bdb6a6c84720fa"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_92e8e8867845483820a82e3724"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "UQ_92e8e8867845483820a82e3724d"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP COLUMN "batch_code"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD "batch_code" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "UQ_92e8e8867845483820a82e3724d" UNIQUE ("batch_code")`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."batch"."batch_code" IS 'Código do lote'`);
        await queryRunner.query(`CREATE INDEX "IDX_92e8e8867845483820a82e3724" ON "pharmasys"."batch" ("batch_code") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb92aef269bdb6a6c84720fa" ON "pharmasys"."batch" ("item_id", "company_id", "batch_code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fbb92aef269bdb6a6c84720fa"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_92e8e8867845483820a82e3724"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."batch"."batch_code" IS 'Código do lote'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "UQ_92e8e8867845483820a82e3724d"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP COLUMN "batch_code"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD "batch_code" character varying(90) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "UQ_92e8e8867845483820a82e3724d" UNIQUE ("batch_code")`);
        await queryRunner.query(`CREATE INDEX "IDX_92e8e8867845483820a82e3724" ON "pharmasys"."batch" ("batch_code") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb92aef269bdb6a6c84720fa" ON "pharmasys"."batch" ("batch_code", "item_id", "company_id") `);
    }

}
