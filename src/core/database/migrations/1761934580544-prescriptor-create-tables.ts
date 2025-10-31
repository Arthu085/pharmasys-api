import { MigrationInterface, QueryRunner } from "typeorm";

export class PrescriptorCreateTables1761934580544 implements MigrationInterface {
    name = 'PrescriptorCreateTables1761934580544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."advice_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."advice" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."advice_status_enum" NOT NULL DEFAULT 'A', "acronym" character varying(10) NOT NULL, "full_name" character varying(100) NOT NULL, CONSTRAINT "UQ_2f53eae24935a4e85066ee449d0" UNIQUE ("uuid"), CONSTRAINT "UQ_8f2a2df5794ca47873bc2506919" UNIQUE ("acronym"), CONSTRAINT "PK_e20d6c014c3233fb2d811c441c3" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."advice"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."advice"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."advice"."acronym" IS 'Código do conselho'; COMMENT ON COLUMN "pharmasys"."advice"."full_name" IS 'Descrição do conselho'`);
        await queryRunner.query(`CREATE INDEX "IDX_2f53eae24935a4e85066ee449d" ON "pharmasys"."advice" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_4c9ea2244761f90501a3a46884" ON "pharmasys"."advice" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."advice" IS 'Tabela para o cadastro dos conselhos profissionais'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."prescriptor_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."prescriptor" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."prescriptor_status_enum" NOT NULL DEFAULT 'A', "name" character varying(150) NOT NULL, "registration_number" character varying(30) NOT NULL, "specialty" character varying(150), "state" character(2) NOT NULL, "user_created_id" integer, "user_updated_id" integer, "advice_id" integer, CONSTRAINT "UQ_3330b76334cdc41c0f24dfb3bd4" UNIQUE ("uuid"), CONSTRAINT "PK_410772504ec7a1ea828e3f09e21" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."prescriptor"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."prescriptor"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."prescriptor"."name" IS 'Nome do prescritor'; COMMENT ON COLUMN "pharmasys"."prescriptor"."registration_number" IS 'Número de registro do prescritor no conselho profissional'; COMMENT ON COLUMN "pharmasys"."prescriptor"."specialty" IS 'Especialidade do prescritor'; COMMENT ON COLUMN "pharmasys"."prescriptor"."state" IS 'UF do conselho profissional'`);
        await queryRunner.query(`CREATE INDEX "IDX_3330b76334cdc41c0f24dfb3bd" ON "pharmasys"."prescriptor" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f28db9d048a44177d09e814fe" ON "pharmasys"."prescriptor" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d3944bbe4ff9ec516ac4449fc" ON "pharmasys"."prescriptor" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_00149dafd65606b748d5bd3067" ON "pharmasys"."prescriptor" ("registration_number") `);
        await queryRunner.query(`CREATE INDEX "IDX_55a97082454141e5a786963137" ON "pharmasys"."prescriptor" ("advice_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce705d727528348ea7bc0dbc75" ON "pharmasys"."prescriptor" ("name", "registration_number", "advice_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."prescriptor" IS 'Tabela para cadastro de prescritores'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" ADD CONSTRAINT "FK_848df84b4888c0a364bbc6e1031" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" ADD CONSTRAINT "FK_98c723a430a0587554a25cce0a1" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" ADD CONSTRAINT "FK_55a97082454141e5a7869631375" FOREIGN KEY ("advice_id") REFERENCES "pharmasys"."advice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" DROP CONSTRAINT "FK_55a97082454141e5a7869631375"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" DROP CONSTRAINT "FK_98c723a430a0587554a25cce0a1"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" DROP CONSTRAINT "FK_848df84b4888c0a364bbc6e1031"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."prescriptor" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ce705d727528348ea7bc0dbc75"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_55a97082454141e5a786963137"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_00149dafd65606b748d5bd3067"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_8d3944bbe4ff9ec516ac4449fc"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_8f28db9d048a44177d09e814fe"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3330b76334cdc41c0f24dfb3bd"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."prescriptor"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."prescriptor_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."advice" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4c9ea2244761f90501a3a46884"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_2f53eae24935a4e85066ee449d"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."advice"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."advice_status_enum"`);
    }

}
