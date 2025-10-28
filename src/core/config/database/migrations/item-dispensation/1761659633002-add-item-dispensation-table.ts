import { MigrationInterface, QueryRunner } from "typeorm";

export class AddItemDispensationTable1761659633002 implements MigrationInterface {
    name = 'AddItemDispensationTable1761659633002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."item_dispensation_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."item_dispensation" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."item_dispensation_status_enum" NOT NULL DEFAULT 'A', "dispensation_date" TIMESTAMP WITH TIME ZONE NOT NULL, "user_created_id" integer, "user_updated_id" integer, "patient_id" integer, "prescriptor_id" integer, CONSTRAINT "PK_4cfe6ce4f87f57b675bf0a1a881" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."item_dispensation"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."item_dispensation"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."item_dispensation"."dispensation_date" IS 'Data da dispensação selecionada pelo usuário'`);
        await queryRunner.query(`CREATE INDEX "IDX_f6051247f677ea801874015d1d" ON "pharmasys"."item_dispensation" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_985c661482eefd9564ed0fe405" ON "pharmasys"."item_dispensation" ("patient_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fa4fd2fbe9e8b3f9e2fcc2e33" ON "pharmasys"."item_dispensation" ("prescriptor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7e12385d0069718038f7b47689" ON "pharmasys"."item_dispensation" ("dispensation_date") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."item_dispensation" IS 'Tabela para cadastro dispensação de itens'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."item_dispensation_item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."item_dispensation_item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."item_dispensation_item_status_enum" NOT NULL DEFAULT 'A', "quantity" integer NOT NULL, "is_psychotropic" boolean NOT NULL DEFAULT false, "prescription_notification_number" character varying(50), "item_dispensation_id" integer, "item_id" integer, "batch_id" integer, CONSTRAINT "PK_bf8d9f7a025351dc1422e390b58" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."item_dispensation_item"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."item_dispensation_item"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."item_dispensation_item"."quantity" IS 'Quantidade de cada item'; COMMENT ON COLUMN "pharmasys"."item_dispensation_item"."is_psychotropic" IS 'Verifica se é psicotrópico ou não'; COMMENT ON COLUMN "pharmasys"."item_dispensation_item"."prescription_notification_number" IS 'Número da notificação da prescrição (é necessário somente se é psicotrópico)'`);
        await queryRunner.query(`CREATE INDEX "IDX_8c047643abfe8191c5f38517d8" ON "pharmasys"."item_dispensation_item" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f5ed6ea366d861b5d05288aac" ON "pharmasys"."item_dispensation_item" ("item_dispensation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e0c736b62fed7371ee611f62d6" ON "pharmasys"."item_dispensation_item" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea173d7c0ef85673ea282514e5" ON "pharmasys"."item_dispensation_item" ("batch_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."item_dispensation_item" IS 'Tabela para cadastro de dados do item na dispensação'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD CONSTRAINT "FK_fa2a37ac2e39c019ccd2c10b295" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD CONSTRAINT "FK_1aee4e1a4ebb77c7afa4c45dc8d" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD CONSTRAINT "FK_985c661482eefd9564ed0fe405c" FOREIGN KEY ("patient_id") REFERENCES "pharmasys"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD CONSTRAINT "FK_3fa4fd2fbe9e8b3f9e2fcc2e33b" FOREIGN KEY ("prescriptor_id") REFERENCES "pharmasys"."prescriptor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" ADD CONSTRAINT "FK_9f5ed6ea366d861b5d05288aacb" FOREIGN KEY ("item_dispensation_id") REFERENCES "pharmasys"."item_dispensation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" ADD CONSTRAINT "FK_e0c736b62fed7371ee611f62d68" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" ADD CONSTRAINT "FK_ea173d7c0ef85673ea282514e56" FOREIGN KEY ("batch_id") REFERENCES "pharmasys"."batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" DROP CONSTRAINT "FK_ea173d7c0ef85673ea282514e56"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" DROP CONSTRAINT "FK_e0c736b62fed7371ee611f62d68"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" DROP CONSTRAINT "FK_9f5ed6ea366d861b5d05288aacb"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP CONSTRAINT "FK_3fa4fd2fbe9e8b3f9e2fcc2e33b"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP CONSTRAINT "FK_985c661482eefd9564ed0fe405c"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP CONSTRAINT "FK_1aee4e1a4ebb77c7afa4c45dc8d"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP CONSTRAINT "FK_fa2a37ac2e39c019ccd2c10b295"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."item_dispensation_item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ea173d7c0ef85673ea282514e5"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e0c736b62fed7371ee611f62d6"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_9f5ed6ea366d861b5d05288aac"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_8c047643abfe8191c5f38517d8"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."item_dispensation_item"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."item_dispensation_item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."item_dispensation" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_7e12385d0069718038f7b47689"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fa4fd2fbe9e8b3f9e2fcc2e33"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_985c661482eefd9564ed0fe405"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_f6051247f677ea801874015d1d"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."item_dispensation"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."item_dispensation_status_enum"`);
    }

}
