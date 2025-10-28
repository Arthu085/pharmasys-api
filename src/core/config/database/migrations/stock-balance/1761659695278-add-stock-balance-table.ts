import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockBalanceTable1761659695278 implements MigrationInterface {
    name = 'AddStockBalanceTable1761659695278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."stock_balance_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."stock_balance" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."stock_balance_status_enum" NOT NULL DEFAULT 'A', "quantity" integer NOT NULL, "item_id" integer, "batch_id" integer, "stock_location_id" integer, CONSTRAINT "PK_0296c3ed44274fe05333f9609d9" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."stock_balance"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."stock_balance"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."stock_balance"."quantity" IS 'Quantidade no estoque'`);
        await queryRunner.query(`CREATE INDEX "IDX_0bc5570bc31c816e172e7ee9ad" ON "pharmasys"."stock_balance" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_a50119e7fff048aff1efe081ae" ON "pharmasys"."stock_balance" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b9cc86d2e0c604213904f2c30" ON "pharmasys"."stock_balance" ("batch_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4d5f854dd83f415db791512d68" ON "pharmasys"."stock_balance" ("stock_location_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_84a5347a12191ddb31eb094665" ON "pharmasys"."stock_balance" ("item_id", "batch_id", "stock_location_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_balance" IS 'Tabela para consulta de estoque'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" ADD CONSTRAINT "FK_a50119e7fff048aff1efe081aef" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" ADD CONSTRAINT "FK_7b9cc86d2e0c604213904f2c309" FOREIGN KEY ("batch_id") REFERENCES "pharmasys"."batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" ADD CONSTRAINT "FK_4d5f854dd83f415db791512d68a" FOREIGN KEY ("stock_location_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" DROP CONSTRAINT "FK_4d5f854dd83f415db791512d68a"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" DROP CONSTRAINT "FK_7b9cc86d2e0c604213904f2c309"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" DROP CONSTRAINT "FK_a50119e7fff048aff1efe081aef"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_balance" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_84a5347a12191ddb31eb094665"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4d5f854dd83f415db791512d68"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_7b9cc86d2e0c604213904f2c30"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a50119e7fff048aff1efe081ae"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_0bc5570bc31c816e172e7ee9ad"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."stock_balance"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."stock_balance_status_enum"`);
    }

}
