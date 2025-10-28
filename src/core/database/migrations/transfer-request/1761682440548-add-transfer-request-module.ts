import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransferRequestModule1761682440548 implements MigrationInterface {
    name = 'AddTransferRequestModule1761682440548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_reason_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."transfer_reason" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."transfer_reason_status_enum" NOT NULL DEFAULT 'A', "name" character varying(150) NOT NULL, CONSTRAINT "UQ_3cfb021fa9d54a6ec7bce386502" UNIQUE ("uuid"), CONSTRAINT "UQ_48bc87a7fca01ee21ce272f71aa" UNIQUE ("name"), CONSTRAINT "PK_ddc7acab5c82b80c08bcf561fef" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."transfer_reason"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."transfer_reason"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."transfer_reason"."name" IS 'Nome das razões de transferência'`);
        await queryRunner.query(`CREATE INDEX "IDX_3cfb021fa9d54a6ec7bce38650" ON "pharmasys"."transfer_reason" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_8ea66bce61d0c8d040d7ec0cd0" ON "pharmasys"."transfer_reason" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_reason" IS 'Tabela para cadastro dos motivos de transferência'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_transfer_status_enum" AS ENUM('P', 'S', 'C', 'N')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."transfer_request" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."transfer_request_status_enum" NOT NULL DEFAULT 'A', "request_date" TIMESTAMP WITH TIME ZONE NOT NULL, "transfer_status" "pharmasys"."transfer_request_transfer_status_enum" NOT NULL DEFAULT 'P', "user_created_id" integer, "user_updated_id" integer, "central_stock_id" integer, "destination_id" integer, "transfer_reason_id" integer, CONSTRAINT "UQ_fd50c319e5ad9e05ac9fb05423f" UNIQUE ("uuid"), CONSTRAINT "PK_de9b8501ed3bf28cd7dbdcb1d60" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."transfer_request"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."transfer_request"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."transfer_request"."request_date" IS 'Data do pedido de transferência selecionada pelo usuário'; COMMENT ON COLUMN "pharmasys"."transfer_request"."transfer_status" IS 'Status do pedido de transferência (P-Pendente, S-Separação, C-Concluído, N-Negado)'`);
        await queryRunner.query(`CREATE INDEX "IDX_fd50c319e5ad9e05ac9fb05423" ON "pharmasys"."transfer_request" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_5b9230be5fa5550b010139fdfe" ON "pharmasys"."transfer_request" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_aefff69f5ce3f1bffb10b876df" ON "pharmasys"."transfer_request" ("central_stock_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bd0657af041ff090b06b61a9a" ON "pharmasys"."transfer_request" ("destination_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e534b6a02089dfec6c54991861" ON "pharmasys"."transfer_request" ("request_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_602bfc244af387a99933800152" ON "pharmasys"."transfer_request" ("transfer_reason_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9bcfa9298263b7da739fdbc77" ON "pharmasys"."transfer_request" ("transfer_status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_request" IS 'Tabela para cadastro de pedidos de transferência de estoque'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_item_transfer_status_enum" AS ENUM('O', 'S', 'F', 'C')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."transfer_request_item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."transfer_request_item_status_enum" NOT NULL DEFAULT 'A', "transfer_status" "pharmasys"."transfer_request_item_transfer_status_enum" NOT NULL DEFAULT 'O', "quantity" integer NOT NULL, "transfer_request_id" integer, "item_id" integer, CONSTRAINT "UQ_7ae19fb31a4e554544e892244aa" UNIQUE ("uuid"), CONSTRAINT "PK_fbcdddf87a0136f887b0849dc69" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."transfer_request_item"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."transfer_request_item"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."transfer_request_item"."transfer_status" IS 'Status do  item do pedido de transferência (A-Aberto, S-Separação, F-Finalizado, C-Cancelado)'; COMMENT ON COLUMN "pharmasys"."transfer_request_item"."quantity" IS 'Quantidade de cada item'`);
        await queryRunner.query(`CREATE INDEX "IDX_7ae19fb31a4e554544e892244a" ON "pharmasys"."transfer_request_item" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_ef274215194b03b985a1037bdf" ON "pharmasys"."transfer_request_item" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_b3ce2eb9eaf59d1af7f5142d8f" ON "pharmasys"."transfer_request_item" ("transfer_request_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a05b84bdf411cf3be1a2e69ada" ON "pharmasys"."transfer_request_item" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_484a3a973aa2ac31413a592e1f" ON "pharmasys"."transfer_request_item" ("transfer_status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_request_item" IS 'Tabela para cadastro de dados do item no pedido de trasnferência de estoque'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_0c54cc2943d0a7aba8b7540d9e1" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_e2e4bde5ee424669d0cdc1f4219" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_aefff69f5ce3f1bffb10b876dfe" FOREIGN KEY ("central_stock_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_0bd0657af041ff090b06b61a9a6" FOREIGN KEY ("destination_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_602bfc244af387a99933800152a" FOREIGN KEY ("transfer_reason_id") REFERENCES "pharmasys"."transfer_reason"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD CONSTRAINT "FK_b3ce2eb9eaf59d1af7f5142d8f9" FOREIGN KEY ("transfer_request_id") REFERENCES "pharmasys"."transfer_request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD CONSTRAINT "FK_a05b84bdf411cf3be1a2e69adac" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP CONSTRAINT "FK_a05b84bdf411cf3be1a2e69adac"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP CONSTRAINT "FK_b3ce2eb9eaf59d1af7f5142d8f9"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_602bfc244af387a99933800152a"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_0bd0657af041ff090b06b61a9a6"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_aefff69f5ce3f1bffb10b876dfe"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_e2e4bde5ee424669d0cdc1f4219"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_0c54cc2943d0a7aba8b7540d9e1"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_request_item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_484a3a973aa2ac31413a592e1f"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a05b84bdf411cf3be1a2e69ada"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_b3ce2eb9eaf59d1af7f5142d8f"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ef274215194b03b985a1037bdf"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_7ae19fb31a4e554544e892244a"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."transfer_request_item"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_item_transfer_status_enum"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_request" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a9bcfa9298263b7da739fdbc77"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_602bfc244af387a99933800152"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e534b6a02089dfec6c54991861"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_0bd0657af041ff090b06b61a9a"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_aefff69f5ce3f1bffb10b876df"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_5b9230be5fa5550b010139fdfe"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fd50c319e5ad9e05ac9fb05423"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."transfer_request"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_transfer_status_enum"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_reason" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_8ea66bce61d0c8d040d7ec0cd0"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3cfb021fa9d54a6ec7bce38650"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."transfer_reason"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_reason_status_enum"`);
    }

}
