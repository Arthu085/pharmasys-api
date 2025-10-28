import { MigrationInterface, QueryRunner } from "typeorm";

export class AddItemTable1761659552608 implements MigrationInterface {
    name = 'AddItemTable1761659552608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."type_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."type_status_enum" NOT NULL DEFAULT 'A', "name" character varying(100) NOT NULL, CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."type"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."type"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."type"."name" IS 'Nome do tipo'`);
        await queryRunner.query(`CREATE INDEX "IDX_b2eb5e7d7e223661e53cffef25" ON "pharmasys"."type" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."type" IS 'Tabela para cadastro de tipos de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."subtype_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."subtype" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."subtype_status_enum" NOT NULL DEFAULT 'A', "name" character varying(100) NOT NULL, "type_id" integer, CONSTRAINT "UQ_ad1ad2a6560395aa79d3860119f" UNIQUE ("name"), CONSTRAINT "PK_3c85c72273d84fb92c1fb591963" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."subtype"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."subtype"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."subtype"."name" IS 'Nome do subtipo'`);
        await queryRunner.query(`CREATE INDEX "IDX_3ceb2dd31f49db5876bd340502" ON "pharmasys"."subtype" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."subtype" IS 'Tabela para cadastro de subtipos de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."presentation_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."presentation" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."presentation_status_enum" NOT NULL DEFAULT 'A', "name" character varying(100) NOT NULL, CONSTRAINT "UQ_7c6d5273ad27dffb942581c7128" UNIQUE ("name"), CONSTRAINT "PK_b3d0364e16cd51d8196a13c528d" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."presentation"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."presentation"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."presentation"."name" IS 'Nome da apresentação'`);
        await queryRunner.query(`CREATE INDEX "IDX_743f058191efdd962457b403c6" ON "pharmasys"."presentation" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."presentation" IS 'Tabela para cadastro de apresentações de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."dosage_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."dosage" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."dosage_status_enum" NOT NULL DEFAULT 'A', "format" character varying(100) NOT NULL, CONSTRAINT "UQ_f210301067d44ba3e7359b5fcba" UNIQUE ("format"), CONSTRAINT "PK_709f3d2911c3d93c12ff020f041" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."dosage"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."dosage"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."dosage"."format" IS 'Formato da dosagem'`);
        await queryRunner.query(`CREATE INDEX "IDX_9f7062ed6b375b22bb3b5e192d" ON "pharmasys"."dosage" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."dosage" IS 'Tabela para cadastro de dosagens de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."item_status_enum" NOT NULL DEFAULT 'A', "name" character varying(255) NOT NULL, "user_created_id" integer, "user_updated_id" integer, "type_id" integer, "presentation_id" integer, "dosage_id" integer, "subtype_id" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."item"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."item"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."item"."name" IS 'Nome do item'`);
        await queryRunner.query(`CREATE INDEX "IDX_5d4159d4cf65e41ba84e70fc11" ON "pharmasys"."item" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_c6ae12601fed4e2ee5019544dd" ON "pharmasys"."item" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_64cde7db02a99c28d4b67efb36" ON "pharmasys"."item" ("type_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_787ca5aac47f18b87793adef2b" ON "pharmasys"."item" ("presentation_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_20edfca72efffb4351690ac3a8" ON "pharmasys"."item" ("dosage_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_033336eb9ed3ac1d5abe9cf350" ON "pharmasys"."item" ("subtype_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a2324a27419ed08ee277acc6e5" ON "pharmasys"."item" ("name", "type_id", "presentation_id", "dosage_id", "subtype_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."item" IS 'Tabela para o cadastro de item'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."subtype" ADD CONSTRAINT "FK_79896ca02b2da92747610af3c09" FOREIGN KEY ("type_id") REFERENCES "pharmasys"."type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD CONSTRAINT "FK_50fd2b884d4d505736c27761b49" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD CONSTRAINT "FK_4ed225701049d6bc168d6c104c7" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD CONSTRAINT "FK_64cde7db02a99c28d4b67efb367" FOREIGN KEY ("type_id") REFERENCES "pharmasys"."type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD CONSTRAINT "FK_787ca5aac47f18b87793adef2b6" FOREIGN KEY ("presentation_id") REFERENCES "pharmasys"."presentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD CONSTRAINT "FK_20edfca72efffb4351690ac3a8c" FOREIGN KEY ("dosage_id") REFERENCES "pharmasys"."dosage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD CONSTRAINT "FK_033336eb9ed3ac1d5abe9cf3507" FOREIGN KEY ("subtype_id") REFERENCES "pharmasys"."subtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP CONSTRAINT "FK_033336eb9ed3ac1d5abe9cf3507"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP CONSTRAINT "FK_20edfca72efffb4351690ac3a8c"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP CONSTRAINT "FK_787ca5aac47f18b87793adef2b6"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP CONSTRAINT "FK_64cde7db02a99c28d4b67efb367"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP CONSTRAINT "FK_4ed225701049d6bc168d6c104c7"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP CONSTRAINT "FK_50fd2b884d4d505736c27761b49"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."subtype" DROP CONSTRAINT "FK_79896ca02b2da92747610af3c09"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a2324a27419ed08ee277acc6e5"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_033336eb9ed3ac1d5abe9cf350"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_20edfca72efffb4351690ac3a8"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_787ca5aac47f18b87793adef2b"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_64cde7db02a99c28d4b67efb36"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_c6ae12601fed4e2ee5019544dd"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_5d4159d4cf65e41ba84e70fc11"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."item"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."dosage" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_9f7062ed6b375b22bb3b5e192d"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."dosage"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."dosage_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."presentation" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_743f058191efdd962457b403c6"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."presentation"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."presentation_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."subtype" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3ceb2dd31f49db5876bd340502"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."subtype"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."subtype_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."type" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_b2eb5e7d7e223661e53cffef25"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."type"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."type_status_enum"`);
    }

}
