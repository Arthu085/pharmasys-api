import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockLocationColumnItemDispensation1768083180072 implements MigrationInterface {
    name = 'AddStockLocationColumnItemDispensation1768083180072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_c46fc51ea2f288685167cd5626"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD "stock_location_id" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."item_dispensation"."stock_location_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`CREATE INDEX "IDX_f58e34cc213237a49fa57c07bc" ON "pharmasys"."item_dispensation" ("stock_location_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_17322282d24ce498e423c36a42" ON "pharmasys"."item_dispensation" ("patient_id", "dispensation_date", "prescriptor_id", "stock_location_id") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD CONSTRAINT "FK_f58e34cc213237a49fa57c07bce" FOREIGN KEY ("stock_location_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP CONSTRAINT "FK_f58e34cc213237a49fa57c07bce"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_17322282d24ce498e423c36a42"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_f58e34cc213237a49fa57c07bc"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."item_dispensation"."stock_location_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP COLUMN "stock_location_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_c46fc51ea2f288685167cd5626" ON "pharmasys"."item_dispensation" ("dispensation_date", "patient_id", "prescriptor_id") `);
    }

}
