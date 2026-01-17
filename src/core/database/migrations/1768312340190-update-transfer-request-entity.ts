import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTransferRequestEntity1768312340190 implements MigrationInterface {
    name = 'UpdateTransferRequestEntity1768312340190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_aefff69f5ce3f1bffb10b876dfe"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_aefff69f5ce3f1bffb10b876df"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" RENAME COLUMN "central_stock_id" TO "origin_id"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_request_item" IS 'Tabela para cadastro de dados do item no pedido de transferência de estoque'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD "batch_id" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."transfer_request_item"."batch_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`ALTER TYPE "pharmasys"."transfer_request_transfer_status_enum" RENAME TO "transfer_request_transfer_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_transfer_status_enum" AS ENUM('PENDENTE', 'SEPARACAO', 'CONCLUIDO', 'NEGADO')`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ALTER COLUMN "transfer_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ALTER COLUMN "transfer_status" TYPE "pharmasys"."transfer_request_transfer_status_enum" USING "transfer_status"::"text"::"pharmasys"."transfer_request_transfer_status_enum"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ALTER COLUMN "transfer_status" SET DEFAULT 'PENDENTE'`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_transfer_status_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."transfer_request"."transfer_status" IS 'Status do pedido de transferência'`);
        await queryRunner.query(`ALTER TYPE "pharmasys"."transfer_request_item_transfer_status_enum" RENAME TO "transfer_request_item_transfer_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_item_transfer_status_enum" AS ENUM('ABERTO', 'SEPARACAO', 'FINALIZADO', 'CANCELADO')`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ALTER COLUMN "transfer_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ALTER COLUMN "transfer_status" TYPE "pharmasys"."transfer_request_item_transfer_status_enum" USING "transfer_status"::"text"::"pharmasys"."transfer_request_item_transfer_status_enum"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ALTER COLUMN "transfer_status" SET DEFAULT 'ABERTO'`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_item_transfer_status_enum_old"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."transfer_request_item"."transfer_status" IS 'Status do item do pedido de transferência'`);
        await queryRunner.query(`CREATE INDEX "IDX_176b1b59d94bed7d4762a12ce8" ON "pharmasys"."transfer_request" ("origin_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8db1ecfbffe95dd6d1e789a4e" ON "pharmasys"."transfer_request" ("origin_id", "destination_id", "request_date", "transfer_status", "transfer_reason_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_eaf7132d76caa94b902eace5b4" ON "pharmasys"."transfer_request_item" ("batch_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8898e45219eedf76a2a785257" ON "pharmasys"."transfer_request_item" ("transfer_request_id", "item_id", "batch_id", "transfer_status") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_176b1b59d94bed7d4762a12ce8b" FOREIGN KEY ("origin_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD CONSTRAINT "FK_eaf7132d76caa94b902eace5b4e" FOREIGN KEY ("batch_id") REFERENCES "pharmasys"."batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP CONSTRAINT "FK_eaf7132d76caa94b902eace5b4e"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP CONSTRAINT "FK_176b1b59d94bed7d4762a12ce8b"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_d8898e45219eedf76a2a785257"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_eaf7132d76caa94b902eace5b4"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e8db1ecfbffe95dd6d1e789a4e"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_176b1b59d94bed7d4762a12ce8"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."transfer_request_item"."transfer_status" IS 'Status do  item do pedido de transferência (A-Aberto, S-Separação, F-Finalizado, C-Cancelado)'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_item_transfer_status_enum_old" AS ENUM('A', 'S', 'F', 'C')`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ALTER COLUMN "transfer_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ALTER COLUMN "transfer_status" TYPE "pharmasys"."transfer_request_item_transfer_status_enum_old" USING "transfer_status"::"text"::"pharmasys"."transfer_request_item_transfer_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ALTER COLUMN "transfer_status" SET DEFAULT 'A'`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_item_transfer_status_enum"`);
        await queryRunner.query(`ALTER TYPE "pharmasys"."transfer_request_item_transfer_status_enum_old" RENAME TO "transfer_request_item_transfer_status_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."transfer_request"."transfer_status" IS 'Status do pedido de transferência (P-Pendente, S-Separação, C-Concluído, N-Negado)'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."transfer_request_transfer_status_enum_old" AS ENUM('P', 'S', 'C', 'N')`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ALTER COLUMN "transfer_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ALTER COLUMN "transfer_status" TYPE "pharmasys"."transfer_request_transfer_status_enum_old" USING "transfer_status"::"text"::"pharmasys"."transfer_request_transfer_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ALTER COLUMN "transfer_status" SET DEFAULT 'P'`);
        await queryRunner.query(`DROP TYPE "pharmasys"."transfer_request_transfer_status_enum"`);
        await queryRunner.query(`ALTER TYPE "pharmasys"."transfer_request_transfer_status_enum_old" RENAME TO "transfer_request_transfer_status_enum"`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."transfer_request_item"."batch_id" IS 'Identificador único da entidade'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP COLUMN "batch_id"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."transfer_request_item" IS 'Tabela para cadastro de dados do item no pedido de trasnferência de estoque'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" RENAME COLUMN "origin_id" TO "central_stock_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_aefff69f5ce3f1bffb10b876df" ON "pharmasys"."transfer_request" ("central_stock_id") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD CONSTRAINT "FK_aefff69f5ce3f1bffb10b876dfe" FOREIGN KEY ("central_stock_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
