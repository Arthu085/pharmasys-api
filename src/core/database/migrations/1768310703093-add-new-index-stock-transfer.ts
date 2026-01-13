import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewIndexStockTransfer1768310703093 implements MigrationInterface {
    name = 'AddNewIndexStockTransfer1768310703093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_ac39dc8084523bd482e6f4713c" ON "pharmasys"."stock_transfer_item" ("stock_transfer_id", "item_id", "batch_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc70e3e73fb5cc1a0076cface8" ON "pharmasys"."stock_transfer" ("transfer_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d71f85afb573b6e0016ea094d" ON "pharmasys"."stock_transfer" ("transfer_date", "origin_id", "destination_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_8d71f85afb573b6e0016ea094d"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fc70e3e73fb5cc1a0076cface8"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ac39dc8084523bd482e6f4713c"`);
    }

}
