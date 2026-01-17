import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteItemColumnInBatch1767019654214 implements MigrationInterface {
    name = 'DeleteItemColumnInBatch1767019654214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "FK_4be0d33148594e7326423343360"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fbb92aef269bdb6a6c84720fa"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4be0d33148594e732642334336"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP COLUMN "item_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_1157f9d8000f7f01fd6b8cab79" ON "pharmasys"."batch" ("company_id", "batch_code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_1157f9d8000f7f01fd6b8cab79"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD "item_id" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_4be0d33148594e732642334336" ON "pharmasys"."batch" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb92aef269bdb6a6c84720fa" ON "pharmasys"."batch" ("item_id", "company_id", "batch_code") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "FK_4be0d33148594e7326423343360" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
