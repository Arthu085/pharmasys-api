import { MigrationInterface, QueryRunner } from "typeorm";

export class StockTransferCreateTables1761934635224 implements MigrationInterface {
    name = 'StockTransferCreateTables1761934635224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."stock_transfer_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."stock_transfer" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."stock_transfer_status_enum" NOT NULL DEFAULT 'A', "transfer_date" TIMESTAMP WITH TIME ZONE NOT NULL, "user_created_id" integer, "user_updated_id" integer, "origin_id" integer, "destination_id" integer, CONSTRAINT "UQ_fc554b7666c0b2b924ecff905f1" UNIQUE ("uuid"), CONSTRAINT "PK_b6165ea3cc5b8062e7eaa1bd44d" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."stock_transfer"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."stock_transfer"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."stock_transfer"."transfer_date" IS 'Data de transferência selecionada pelo usuário'`);
        await queryRunner.query(`CREATE INDEX "IDX_fc554b7666c0b2b924ecff905f" ON "pharmasys"."stock_transfer" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_70f17fc214ab5e82cc2eb9245a" ON "pharmasys"."stock_transfer" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_438547aad8702d794e26f1fcea" ON "pharmasys"."stock_transfer" ("origin_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7ace1d0ca1821e2f14976edc5" ON "pharmasys"."stock_transfer" ("destination_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_transfer" IS 'Tabela para cadastro de dados de transferência de item do estoque'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."stock_transfer_item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."stock_transfer_item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."stock_transfer_item_status_enum" NOT NULL DEFAULT 'A', "quantity" integer NOT NULL, "stock_transfer_id" integer, "item_id" integer, "batch_id" integer, CONSTRAINT "UQ_df0d9cd371ecafcdc8d367c618f" UNIQUE ("uuid"), CONSTRAINT "PK_eb4365c2176c09f6dd8e61b27da" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."stock_transfer_item"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."stock_transfer_item"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."stock_transfer_item"."quantity" IS 'Quantidade de cada item'`);
        await queryRunner.query(`CREATE INDEX "IDX_df0d9cd371ecafcdc8d367c618" ON "pharmasys"."stock_transfer_item" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_c940735db6215d92f782b5c239" ON "pharmasys"."stock_transfer_item" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_756b4af55c5ce54ffb8794c7ab" ON "pharmasys"."stock_transfer_item" ("stock_transfer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fff9ebd9bd2b4d474444cd4980" ON "pharmasys"."stock_transfer_item" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b8ac3ae1731c1d49a6921a229d" ON "pharmasys"."stock_transfer_item" ("batch_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_transfer_item" IS 'Tabela para cadastro de dados do item na trasnferência de estoque'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" ADD CONSTRAINT "FK_7253746cd5b79181d8f740dbb9c" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" ADD CONSTRAINT "FK_0460f86b13b0d98b11a278c36c9" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" ADD CONSTRAINT "FK_438547aad8702d794e26f1fcea4" FOREIGN KEY ("origin_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" ADD CONSTRAINT "FK_e7ace1d0ca1821e2f14976edc5a" FOREIGN KEY ("destination_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" ADD CONSTRAINT "FK_756b4af55c5ce54ffb8794c7ab6" FOREIGN KEY ("stock_transfer_id") REFERENCES "pharmasys"."stock_transfer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" ADD CONSTRAINT "FK_fff9ebd9bd2b4d474444cd49802" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" ADD CONSTRAINT "FK_b8ac3ae1731c1d49a6921a229dd" FOREIGN KEY ("batch_id") REFERENCES "pharmasys"."batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" DROP CONSTRAINT "FK_b8ac3ae1731c1d49a6921a229dd"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" DROP CONSTRAINT "FK_fff9ebd9bd2b4d474444cd49802"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" DROP CONSTRAINT "FK_756b4af55c5ce54ffb8794c7ab6"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" DROP CONSTRAINT "FK_e7ace1d0ca1821e2f14976edc5a"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" DROP CONSTRAINT "FK_438547aad8702d794e26f1fcea4"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" DROP CONSTRAINT "FK_0460f86b13b0d98b11a278c36c9"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" DROP CONSTRAINT "FK_7253746cd5b79181d8f740dbb9c"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_transfer_item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_b8ac3ae1731c1d49a6921a229d"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fff9ebd9bd2b4d474444cd4980"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_756b4af55c5ce54ffb8794c7ab"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_c940735db6215d92f782b5c239"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_df0d9cd371ecafcdc8d367c618"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."stock_transfer_item"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."stock_transfer_item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_transfer" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e7ace1d0ca1821e2f14976edc5"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_438547aad8702d794e26f1fcea"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_70f17fc214ab5e82cc2eb9245a"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fc554b7666c0b2b924ecff905f"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."stock_transfer"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."stock_transfer_status_enum"`);
    }

}
