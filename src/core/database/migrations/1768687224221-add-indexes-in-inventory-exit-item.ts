import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesInInventoryExitItem1768687224221 implements MigrationInterface {
    name = 'AddIndexesInInventoryExitItem1768687224221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_1a088fe37d533148bd5e1e2bc7" ON "pharmasys"."inventory-exit-item" ("inventory_exit_id", "item_id", "batch_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_1a088fe37d533148bd5e1e2bc7"`);
    }

}
