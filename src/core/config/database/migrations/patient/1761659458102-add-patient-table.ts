import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPatientTable1761659458102 implements MigrationInterface {
    name = 'AddPatientTable1761659458102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."patient_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."patient" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."patient_status_enum" NOT NULL DEFAULT 'A', "name" character varying(150) NOT NULL, "document" character varying(14) NOT NULL, "user_created_id" integer, "user_updated_id" integer, CONSTRAINT "UQ_56a59567f38ccf4d8209c8e1fc7" UNIQUE ("document"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."patient"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."patient"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."patient"."name" IS 'Nome do paciente'; COMMENT ON COLUMN "pharmasys"."patient"."document" IS 'Documento do paciente'`);
        await queryRunner.query(`CREATE INDEX "IDX_93dba9ca93e029fd2e2f103540" ON "pharmasys"."patient" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_054a6cba30d6f51a1cb1e96f38" ON "pharmasys"."patient" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_bb85fe652952fcdaa00f6078ab" ON "pharmasys"."patient" ("name", "document") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."patient" IS 'Tabela para cadastro de pacientes'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" ADD CONSTRAINT "FK_c2a66daa04002f737670a0091c9" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" ADD CONSTRAINT "FK_198454fde47aa720ec4cc990d43" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" DROP CONSTRAINT "FK_198454fde47aa720ec4cc990d43"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" DROP CONSTRAINT "FK_c2a66daa04002f737670a0091c9"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."patient" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_bb85fe652952fcdaa00f6078ab"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_054a6cba30d6f51a1cb1e96f38"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_93dba9ca93e029fd2e2f103540"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."patient"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."patient_status_enum"`);
    }

}
