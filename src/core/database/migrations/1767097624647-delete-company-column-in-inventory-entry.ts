import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCompanyColumnInInventoryEntry1767097624647 implements MigrationInterface {
    name = 'DeleteCompanyColumnInInventoryEntry1767097624647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP CONSTRAINT "FK_ed908c80c627840723b9e3f2e6b"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ed908c80c627840723b9e3f2e6"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP COLUMN "company_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD "company_id" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_ed908c80c627840723b9e3f2e6" ON "pharmasys"."inventory_entry" ("company_id") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD CONSTRAINT "FK_ed908c80c627840723b9e3f2e6b" FOREIGN KEY ("company_id") REFERENCES "pharmasys"."company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
