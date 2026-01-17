import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUniqueIndexForBatchPatient1767015980503 implements MigrationInterface {
    name = 'FixUniqueIndexForBatchPatient1767015980503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fbb92aef269bdb6a6c84720fa"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "UQ_92e8e8867845483820a82e3724d"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_bb85fe652952fcdaa00f6078ab"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" DROP CONSTRAINT "UQ_56a59567f38ccf4d8209c8e1fc7"`);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb92aef269bdb6a6c84720fa" ON "pharmasys"."batch" ("item_id", "company_id", "batch_code") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb85fe652952fcdaa00f6078ab" ON "pharmasys"."patient" ("name", "document") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_bb85fe652952fcdaa00f6078ab"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fbb92aef269bdb6a6c84720fa"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" ADD CONSTRAINT "UQ_56a59567f38ccf4d8209c8e1fc7" UNIQUE ("document")`);
        await queryRunner.query(`CREATE INDEX "IDX_bb85fe652952fcdaa00f6078ab" ON "pharmasys"."patient" ("name", "document") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "UQ_92e8e8867845483820a82e3724d" UNIQUE ("batch_code")`);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb92aef269bdb6a6c84720fa" ON "pharmasys"."batch" ("item_id", "company_id", "batch_code") `);
    }

}
