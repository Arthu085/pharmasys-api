import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyCreateTables1761934543086 implements MigrationInterface {
    name = 'CompanyCreateTables1761934543086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."company_type_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."company_type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."company_type_status_enum" NOT NULL DEFAULT 'A', "name" character varying(100) NOT NULL, CONSTRAINT "UQ_e8826b9e4baa52ed82709834b75" UNIQUE ("uuid"), CONSTRAINT "UQ_988dc8e37377a72ac44349e35fd" UNIQUE ("name"), CONSTRAINT "PK_b21e9ab8361b2fcc85e6c4f4fa7" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."company_type"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."company_type"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."company_type"."name" IS 'Nome dos tipos de empresa'`);
        await queryRunner.query(`CREATE INDEX "IDX_e8826b9e4baa52ed82709834b7" ON "pharmasys"."company_type" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9fc849ec4f36385f6d61ddc17" ON "pharmasys"."company_type" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."company_type" IS 'Tabela para cadastro dos tipos de empresa'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."company_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."company" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."company_status_enum" NOT NULL DEFAULT 'A', "name" character varying(255) NOT NULL, "cnpj" character varying(18) NOT NULL, "user_created_id" integer, "user_updated_id" integer, CONSTRAINT "UQ_3fa0b2af99d910864a56bb10c9e" UNIQUE ("uuid"), CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb" UNIQUE ("cnpj"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."company"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."company"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."company"."name" IS 'Nome da empresa'; COMMENT ON COLUMN "pharmasys"."company"."cnpj" IS 'CNPJ da empresa'`);
        await queryRunner.query(`CREATE INDEX "IDX_3fa0b2af99d910864a56bb10c9" ON "pharmasys"."company" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7a5d746408a6b4beff6af4b93" ON "pharmasys"."company" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_a76c5cd486f7779bd9c319afd2" ON "pharmasys"."company" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_6681aa20115a9d35994b4c6841" ON "pharmasys"."company" ("name", "cnpj") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."company" IS 'Tabela para cadastro de empresa'`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."company_type_rel" ("company_id" integer NOT NULL, "company_type_id" integer NOT NULL, CONSTRAINT "PK_152f6c103ee64a472a18a3d627c" PRIMARY KEY ("company_id", "company_type_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f8e9fa7aafdcfbe4adaf4c3af" ON "pharmasys"."company_type_rel" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fea078e5c7c24aa9be1bd7a1f8" ON "pharmasys"."company_type_rel" ("company_type_id") `);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" ADD CONSTRAINT "FK_4a100b1bcee44e788e41532c134" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" ADD CONSTRAINT "FK_60b056105857dee7eb2330ff8c9" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company_type_rel" ADD CONSTRAINT "FK_6f8e9fa7aafdcfbe4adaf4c3af4" FOREIGN KEY ("company_id") REFERENCES "pharmasys"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company_type_rel" ADD CONSTRAINT "FK_fea078e5c7c24aa9be1bd7a1f86" FOREIGN KEY ("company_type_id") REFERENCES "pharmasys"."company_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."company_type_rel" DROP CONSTRAINT "FK_fea078e5c7c24aa9be1bd7a1f86"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company_type_rel" DROP CONSTRAINT "FK_6f8e9fa7aafdcfbe4adaf4c3af4"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" DROP CONSTRAINT "FK_60b056105857dee7eb2330ff8c9"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" DROP CONSTRAINT "FK_4a100b1bcee44e788e41532c134"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fea078e5c7c24aa9be1bd7a1f8"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_6f8e9fa7aafdcfbe4adaf4c3af"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."company_type_rel"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."company" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_6681aa20115a9d35994b4c6841"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a76c5cd486f7779bd9c319afd2"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_b7a5d746408a6b4beff6af4b93"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fa0b2af99d910864a56bb10c9"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."company"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."company_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."company_type" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a9fc849ec4f36385f6d61ddc17"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e8826b9e4baa52ed82709834b7"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."company_type"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."company_type_status_enum"`);
    }

}
