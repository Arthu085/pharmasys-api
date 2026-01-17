import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInventoryEntities1767871862348 implements MigrationInterface {
    name = 'UpdateInventoryEntities1767871862348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_7fb27a412c76f44fc3a1a5b106"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_d63500d5cb49df1d10eff280a9"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" ADD "stock_location_id" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."inventory_exit"."stock_location_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`CREATE INDEX "IDX_5445946bb1edbbb35b7e8b3b24" ON "pharmasys"."inventory_exit" ("stock_location_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c4b2928b2055f581eba5cced35" ON "pharmasys"."inventory_exit" ("exit_date", "exit_type_id", "stock_location_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd1480cda5dae07b258f09add9" ON "pharmasys"."inventory_entry" ("invoice_number", "entry_date", "entry_type_id", "stock_location_id") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" ADD CONSTRAINT "FK_5445946bb1edbbb35b7e8b3b24d" FOREIGN KEY ("stock_location_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" DROP CONSTRAINT "FK_5445946bb1edbbb35b7e8b3b24d"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fd1480cda5dae07b258f09add9"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_c4b2928b2055f581eba5cced35"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_5445946bb1edbbb35b7e8b3b24"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."inventory_exit"."stock_location_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" DROP COLUMN "stock_location_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_d63500d5cb49df1d10eff280a9" ON "pharmasys"."inventory_entry" ("invoice_number", "entry_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fb27a412c76f44fc3a1a5b106" ON "pharmasys"."inventory_exit" ("exit_date", "exit_type_id") `);
    }

}
