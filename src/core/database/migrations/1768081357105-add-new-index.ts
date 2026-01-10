import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewIndex1768081357105 implements MigrationInterface {
    name = 'AddNewIndex1768081357105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_c46fc51ea2f288685167cd5626" ON "pharmasys"."item_dispensation" ("patient_id", "dispensation_date", "prescriptor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_601d272ea83c48aab46ea9b5f2" ON "pharmasys"."item_dispensation_item" ("item_dispensation_id", "item_id", "batch_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c2ec5ebfd4abc6c13c8bb29216" ON "pharmasys"."inventory_entry_item" ("inventory_entry_id", "item_id", "batch_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_c2ec5ebfd4abc6c13c8bb29216"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_601d272ea83c48aab46ea9b5f2"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_c46fc51ea2f288685167cd5626"`);
    }

}
