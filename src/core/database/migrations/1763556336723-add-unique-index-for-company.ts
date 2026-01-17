import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexForCompany1763556336723 implements MigrationInterface {
    name = 'AddUniqueIndexForCompany1763556336723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_6681aa20115a9d35994b4c6841"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" DROP CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cnpj_unique_when_not_deleted" ON "pharmasys"."company" ("cnpj") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_6681aa20115a9d35994b4c6841" ON "pharmasys"."company" ("name", "cnpj") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_6681aa20115a9d35994b4c6841"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_cnpj_unique_when_not_deleted"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" ADD CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb" UNIQUE ("cnpj")`);
        await queryRunner.query(`CREATE INDEX "IDX_6681aa20115a9d35994b4c6841" ON "pharmasys"."company" ("name", "cnpj") `);
    }

}
