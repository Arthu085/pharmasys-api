import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryExitCreateTables1761934624071 implements MigrationInterface {
    name = 'InventoryExitCreateTables1761934624071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."exit_item_type_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."exit_item_type" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."exit_item_type_status_enum" NOT NULL DEFAULT 'A', "name" character varying(150) NOT NULL, CONSTRAINT "UQ_4100bdee688c80f70141e85baf8" UNIQUE ("uuid"), CONSTRAINT "UQ_7748f585a6acd2ca7fc7b41821f" UNIQUE ("name"), CONSTRAINT "PK_3108b609c8db00e981b52d6e62a" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."exit_item_type"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."exit_item_type"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."exit_item_type"."name" IS 'Nome dos tipos'`);
        await queryRunner.query(`CREATE INDEX "IDX_4100bdee688c80f70141e85baf" ON "pharmasys"."exit_item_type" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_b8921c70539174673b68420e44" ON "pharmasys"."exit_item_type" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."exit_item_type" IS 'Tabela para cadastro dos tipos de saída de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."inventory_exit_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."inventory_exit" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."inventory_exit_status_enum" NOT NULL DEFAULT 'A', "exit_date" TIMESTAMP WITH TIME ZONE NOT NULL, "notes" text NOT NULL, "user_created_id" integer, "user_updated_id" integer, "exit_type_id" integer, CONSTRAINT "UQ_a0d97645c231bf60210fb46708f" UNIQUE ("uuid"), CONSTRAINT "PK_b58bfbf5288bf9ed126d8bf807f" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."inventory_exit"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."inventory_exit"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."inventory_exit"."exit_date" IS 'Data de saída informada pelo usuário'; COMMENT ON COLUMN "pharmasys"."inventory_exit"."notes" IS 'Anotações da saída'`);
        await queryRunner.query(`CREATE INDEX "IDX_a0d97645c231bf60210fb46708" ON "pharmasys"."inventory_exit" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf9bb54e20d5b03ce3241016e6" ON "pharmasys"."inventory_exit" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_e3be00620b50d43dfa8a21fe95" ON "pharmasys"."inventory_exit" ("exit_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_0bed2ae7c663275515ea7fb7ff" ON "pharmasys"."inventory_exit" ("exit_type_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fb27a412c76f44fc3a1a5b106" ON "pharmasys"."inventory_exit" ("exit_date", "exit_type_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory_exit" IS 'Tabela para cadastro de dados de saída de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."inventory-exit-item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."inventory-exit-item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."inventory-exit-item_status_enum" NOT NULL DEFAULT 'A', "quantity" integer NOT NULL, "inventory_exit_id" integer, "item_id" integer, "batch_id" integer, CONSTRAINT "UQ_06289b6cc03c292c4c1e4b35174" UNIQUE ("uuid"), CONSTRAINT "PK_e07f886ff96e29a68fe9d911c53" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."inventory-exit-item"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."inventory-exit-item"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."inventory-exit-item"."quantity" IS 'Quantidade de cada item'`);
        await queryRunner.query(`CREATE INDEX "IDX_06289b6cc03c292c4c1e4b3517" ON "pharmasys"."inventory-exit-item" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_97e701876f8150ce1d8149addf" ON "pharmasys"."inventory-exit-item" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_ba8c099d85e98afa1bad268e68" ON "pharmasys"."inventory-exit-item" ("inventory_exit_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_941263ddd34c1aa7168e1145c8" ON "pharmasys"."inventory-exit-item" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f5973e1a34ffaa833f4e32e25" ON "pharmasys"."inventory-exit-item" ("batch_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory-exit-item" IS 'Tabela para cadastro de dados do item na saída'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" ADD CONSTRAINT "FK_f5dbf51fc979628d4a372490964" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" ADD CONSTRAINT "FK_aaea6ec1c3ab2db255c223dce94" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" ADD CONSTRAINT "FK_0bed2ae7c663275515ea7fb7ff9" FOREIGN KEY ("exit_type_id") REFERENCES "pharmasys"."exit_item_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" ADD CONSTRAINT "FK_ba8c099d85e98afa1bad268e683" FOREIGN KEY ("inventory_exit_id") REFERENCES "pharmasys"."inventory_exit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" ADD CONSTRAINT "FK_941263ddd34c1aa7168e1145c88" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" ADD CONSTRAINT "FK_4f5973e1a34ffaa833f4e32e256" FOREIGN KEY ("batch_id") REFERENCES "pharmasys"."batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" DROP CONSTRAINT "FK_4f5973e1a34ffaa833f4e32e256"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" DROP CONSTRAINT "FK_941263ddd34c1aa7168e1145c88"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" DROP CONSTRAINT "FK_ba8c099d85e98afa1bad268e683"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" DROP CONSTRAINT "FK_0bed2ae7c663275515ea7fb7ff9"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" DROP CONSTRAINT "FK_aaea6ec1c3ab2db255c223dce94"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" DROP CONSTRAINT "FK_f5dbf51fc979628d4a372490964"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory-exit-item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4f5973e1a34ffaa833f4e32e25"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_941263ddd34c1aa7168e1145c8"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ba8c099d85e98afa1bad268e68"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_97e701876f8150ce1d8149addf"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_06289b6cc03c292c4c1e4b3517"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."inventory-exit-item"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."inventory-exit-item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory_exit" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_7fb27a412c76f44fc3a1a5b106"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_0bed2ae7c663275515ea7fb7ff"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e3be00620b50d43dfa8a21fe95"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_cf9bb54e20d5b03ce3241016e6"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_a0d97645c231bf60210fb46708"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."inventory_exit"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."inventory_exit_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."exit_item_type" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_b8921c70539174673b68420e44"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4100bdee688c80f70141e85baf"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."exit_item_type"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."exit_item_type_status_enum"`);
    }

}
