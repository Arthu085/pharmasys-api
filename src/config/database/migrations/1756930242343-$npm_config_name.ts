import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1756930242343 implements MigrationInterface {
    name = ' $npmConfigName1756930242343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."role"."name" IS 'Nome da função'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."role" IS 'Tabela para cadastro de funções'`);
        await queryRunner.query(`CREATE TYPE "pharmasys_teste"."user_user_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(255) NOT NULL, "user_status" "pharmasys_teste"."user_user_status_enum" NOT NULL DEFAULT 'A', "user_updated_id" integer, "role_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."user"."name" IS 'Nome do usuário'; COMMENT ON COLUMN "pharmasys_teste"."user"."email" IS 'Email do usuário'; COMMENT ON COLUMN "pharmasys_teste"."user"."password" IS 'Senha do usuário'; COMMENT ON COLUMN "pharmasys_teste"."user"."user_status" IS 'Status do usuário'`);
        await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "pharmasys_teste"."user" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_28cc396ed20b4a3263a65d96fe" ON "pharmasys_teste"."user" ("user_status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."user" IS 'Tabela para cadastro de usuários'`);
        await queryRunner.query(`CREATE TYPE "pharmasys_teste"."stock_location_stock_location_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."stock_location" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, "code" character varying(50) NOT NULL, "is_central_stock" boolean NOT NULL DEFAULT false, "stock_location_status" "pharmasys_teste"."stock_location_stock_location_status_enum" NOT NULL DEFAULT 'A', "user_created_id" integer, "user_updated_id" integer, CONSTRAINT "UQ_eb4dd13579b6026ed0449f7a244" UNIQUE ("code"), CONSTRAINT "PK_adf770067d0df1421f525fa25cc" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."stock_location"."name" IS 'Nome do local de estoque'; COMMENT ON COLUMN "pharmasys_teste"."stock_location"."code" IS 'Código do local de estoque'; COMMENT ON COLUMN "pharmasys_teste"."stock_location"."is_central_stock" IS 'Verifica se é estoque central'; COMMENT ON COLUMN "pharmasys_teste"."stock_location"."stock_location_status" IS 'Status do local de estoque'`);
        await queryRunner.query(`CREATE INDEX "IDX_3f798c40d30ad971fb049e26c3" ON "pharmasys_teste"."stock_location" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b5f64e1447db4f31c56b015be" ON "pharmasys_teste"."stock_location" ("stock_location_status") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e8b8a4b61649c6fa421258fae" ON "pharmasys_teste"."stock_location" ("name", "code") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."stock_location" IS 'Tabela para cadastro de locais de estoque'`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_e23bfe7255ada131861292923fe" UNIQUE ("name"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."type"."name" IS 'Nome do tipo'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."type" IS 'Tabela para cadastro de tipos'`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."subtype" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, "type_id" integer, CONSTRAINT "UQ_ad1ad2a6560395aa79d3860119f" UNIQUE ("name"), CONSTRAINT "PK_3c85c72273d84fb92c1fb591963" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."subtype"."name" IS 'Nome do subtipo'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."subtype" IS 'Tabela para cadastro de subtipos'`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."presentation" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_7c6d5273ad27dffb942581c7128" UNIQUE ("name"), CONSTRAINT "PK_b3d0364e16cd51d8196a13c528d" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."presentation"."name" IS 'Nome da apresentação'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."presentation" IS 'Tabela para cadastro de apresentações'`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."dosage" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "format" character varying(100) NOT NULL, CONSTRAINT "UQ_f210301067d44ba3e7359b5fcba" UNIQUE ("format"), CONSTRAINT "PK_709f3d2911c3d93c12ff020f041" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."dosage"."format" IS 'Formato da dosagem'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."dosage" IS 'Tabela para cadastro de dosagem'`);
        await queryRunner.query(`CREATE TYPE "pharmasys_teste"."item_item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."item" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(255) NOT NULL, "item_status" "pharmasys_teste"."item_item_status_enum" NOT NULL DEFAULT 'A', "type_id" integer, "presentation_id" integer, "dosage_id" integer, "subtype_id" integer, "user_created_id" integer, "user_updated_id" integer, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."item"."name" IS 'Nome do item'; COMMENT ON COLUMN "pharmasys_teste"."item"."item_status" IS 'Status do item'`);
        await queryRunner.query(`CREATE INDEX "IDX_c6ae12601fed4e2ee5019544dd" ON "pharmasys_teste"."item" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e5f89f4a7210ef35d475f3b35" ON "pharmasys_teste"."item" ("item_status") `);
        await queryRunner.query(`CREATE INDEX "IDX_a2324a27419ed08ee277acc6e5" ON "pharmasys_teste"."item" ("name", "type_id", "presentation_id", "dosage_id", "subtype_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."item" IS 'Tabela para o cadastro de item'`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."company_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_988dc8e37377a72ac44349e35fd" UNIQUE ("name"), CONSTRAINT "PK_b21e9ab8361b2fcc85e6c4f4fa7" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."company_type"."name" IS 'Nome dos tipos de empresa'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."company_type" IS 'Tabela para cadastro dos tipos de empresa'`);
        await queryRunner.query(`CREATE TYPE "pharmasys_teste"."company_company_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."company" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "name" character varying(255) NOT NULL, "cnpj" character varying(18) NOT NULL, "company_status" "pharmasys_teste"."company_company_status_enum" NOT NULL DEFAULT 'A', "user_created_id" integer, "user_updated_id" integer, CONSTRAINT "UQ_b55d9c6e6adfa3c6de735c5a2eb" UNIQUE ("cnpj"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys_teste"."company"."name" IS 'Nome da empresa'; COMMENT ON COLUMN "pharmasys_teste"."company"."cnpj" IS 'CNPJ da empresa'; COMMENT ON COLUMN "pharmasys_teste"."company"."company_status" IS 'Status da empresa'`);
        await queryRunner.query(`CREATE INDEX "IDX_a76c5cd486f7779bd9c319afd2" ON "pharmasys_teste"."company" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_4cc6b44d99279789707f45e8eb" ON "pharmasys_teste"."company" ("company_status") `);
        await queryRunner.query(`CREATE INDEX "IDX_6681aa20115a9d35994b4c6841" ON "pharmasys_teste"."company" ("name", "cnpj") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."company" IS 'Tabela para cadastro de empresa'`);
        await queryRunner.query(`CREATE TABLE "pharmasys_teste"."company_type_rel" ("company_id" integer NOT NULL, "company_type_id" integer NOT NULL, CONSTRAINT "PK_152f6c103ee64a472a18a3d627c" PRIMARY KEY ("company_id", "company_type_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f8e9fa7aafdcfbe4adaf4c3af" ON "pharmasys_teste"."company_type_rel" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fea078e5c7c24aa9be1bd7a1f8" ON "pharmasys_teste"."company_type_rel" ("company_type_id") `);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "pharmasys_teste"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."stock_location" ADD CONSTRAINT "FK_8c7b7c29039c4989f01d7a68001" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys_teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."stock_location" ADD CONSTRAINT "FK_b871fdee2b544a3c62ebc1f1be5" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys_teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."subtype" ADD CONSTRAINT "FK_79896ca02b2da92747610af3c09" FOREIGN KEY ("type_id") REFERENCES "pharmasys_teste"."type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" ADD CONSTRAINT "FK_64cde7db02a99c28d4b67efb367" FOREIGN KEY ("type_id") REFERENCES "pharmasys_teste"."type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" ADD CONSTRAINT "FK_787ca5aac47f18b87793adef2b6" FOREIGN KEY ("presentation_id") REFERENCES "pharmasys_teste"."presentation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" ADD CONSTRAINT "FK_20edfca72efffb4351690ac3a8c" FOREIGN KEY ("dosage_id") REFERENCES "pharmasys_teste"."dosage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" ADD CONSTRAINT "FK_033336eb9ed3ac1d5abe9cf3507" FOREIGN KEY ("subtype_id") REFERENCES "pharmasys_teste"."subtype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" ADD CONSTRAINT "FK_50fd2b884d4d505736c27761b49" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys_teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" ADD CONSTRAINT "FK_4ed225701049d6bc168d6c104c7" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys_teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company" ADD CONSTRAINT "FK_4a100b1bcee44e788e41532c134" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys_teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company" ADD CONSTRAINT "FK_60b056105857dee7eb2330ff8c9" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys_teste"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company_type_rel" ADD CONSTRAINT "FK_6f8e9fa7aafdcfbe4adaf4c3af4" FOREIGN KEY ("company_id") REFERENCES "pharmasys_teste"."company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company_type_rel" ADD CONSTRAINT "FK_fea078e5c7c24aa9be1bd7a1f86" FOREIGN KEY ("company_type_id") REFERENCES "pharmasys_teste"."company_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company_type_rel" DROP CONSTRAINT "FK_fea078e5c7c24aa9be1bd7a1f86"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company_type_rel" DROP CONSTRAINT "FK_6f8e9fa7aafdcfbe4adaf4c3af4"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company" DROP CONSTRAINT "FK_60b056105857dee7eb2330ff8c9"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."company" DROP CONSTRAINT "FK_4a100b1bcee44e788e41532c134"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" DROP CONSTRAINT "FK_4ed225701049d6bc168d6c104c7"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" DROP CONSTRAINT "FK_50fd2b884d4d505736c27761b49"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" DROP CONSTRAINT "FK_033336eb9ed3ac1d5abe9cf3507"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" DROP CONSTRAINT "FK_20edfca72efffb4351690ac3a8c"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" DROP CONSTRAINT "FK_787ca5aac47f18b87793adef2b6"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."item" DROP CONSTRAINT "FK_64cde7db02a99c28d4b67efb367"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."subtype" DROP CONSTRAINT "FK_79896ca02b2da92747610af3c09"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."stock_location" DROP CONSTRAINT "FK_b871fdee2b544a3c62ebc1f1be5"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."stock_location" DROP CONSTRAINT "FK_8c7b7c29039c4989f01d7a68001"`);
        await queryRunner.query(`ALTER TABLE "pharmasys_teste"."user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_fea078e5c7c24aa9be1bd7a1f8"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_6f8e9fa7aafdcfbe4adaf4c3af"`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."company_type_rel"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."company" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_6681aa20115a9d35994b4c6841"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_4cc6b44d99279789707f45e8eb"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_a76c5cd486f7779bd9c319afd2"`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."company"`);
        await queryRunner.query(`DROP TYPE "pharmasys_teste"."company_company_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."company_type" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."company_type"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_a2324a27419ed08ee277acc6e5"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_0e5f89f4a7210ef35d475f3b35"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_c6ae12601fed4e2ee5019544dd"`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."item"`);
        await queryRunner.query(`DROP TYPE "pharmasys_teste"."item_item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."dosage" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."dosage"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."presentation" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."presentation"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."subtype" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."subtype"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."type" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."type"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."stock_location" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_5e8b8a4b61649c6fa421258fae"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_3b5f64e1447db4f31c56b015be"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_3f798c40d30ad971fb049e26c3"`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."stock_location"`);
        await queryRunner.query(`DROP TYPE "pharmasys_teste"."stock_location_stock_location_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."user" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_28cc396ed20b4a3263a65d96fe"`);
        await queryRunner.query(`DROP INDEX "pharmasys_teste"."IDX_065d4d8f3b5adb4a08841eae3c"`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."user"`);
        await queryRunner.query(`DROP TYPE "pharmasys_teste"."user_user_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys_teste"."role" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys_teste"."role"`);
    }

}
