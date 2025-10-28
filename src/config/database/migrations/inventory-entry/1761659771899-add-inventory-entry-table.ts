import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInventoryEntryTable1761659771899 implements MigrationInterface {
    name = 'AddInventoryEntryTable1761659771899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pharmasys"."entry_item_type" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "UQ_5de3c7fb8b3461a1f13735268ab" UNIQUE ("name"), CONSTRAINT "PK_0dd762d2b87bc363768afc1474b" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."entry_item_type"."name" IS 'Nome dos tipos'`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."entry_item_type" IS 'Tabela para cadastro dos tipos de entrada de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."inventory_entry_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."inventory_entry" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."inventory_entry_status_enum" NOT NULL DEFAULT 'A', "invoice_number" character varying(70), "entry_date" TIMESTAMP WITH TIME ZONE NOT NULL, "total_value" numeric(12,2), "user_created_id" integer, "user_updated_id" integer, "company_id" integer, "entry_type_id" integer, "stock_location_id" integer, CONSTRAINT "PK_6194458c6b3641b5a2d0388b8b7" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."inventory_entry"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."inventory_entry"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."inventory_entry"."invoice_number" IS 'Número da nota fiscal'; COMMENT ON COLUMN "pharmasys"."inventory_entry"."entry_date" IS 'Data de entrada informada pelo usuário'; COMMENT ON COLUMN "pharmasys"."inventory_entry"."total_value" IS 'Valor total se é nota fiscal'`);
        await queryRunner.query(`CREATE INDEX "IDX_e1b81abcf3dca96e5a23a78562" ON "pharmasys"."inventory_entry" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_2858582d1072fd7da5547d30db" ON "pharmasys"."inventory_entry" ("invoice_number") `);
        await queryRunner.query(`CREATE INDEX "IDX_ce08cc8f87e3f3d2b71dcd4933" ON "pharmasys"."inventory_entry" ("entry_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed908c80c627840723b9e3f2e6" ON "pharmasys"."inventory_entry" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7926e4148bba345388fb78cd65" ON "pharmasys"."inventory_entry" ("entry_type_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_427cb6067b91d7eb5c5792e3b2" ON "pharmasys"."inventory_entry" ("stock_location_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d63500d5cb49df1d10eff280a9" ON "pharmasys"."inventory_entry" ("invoice_number", "entry_date") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory_entry" IS 'Tabela para cadastro de dados de entrada de item'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."inventory_entry_item_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."inventory_entry_item" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."inventory_entry_item_status_enum" NOT NULL DEFAULT 'A', "quantity" integer NOT NULL, "unit_price" numeric(12,2) NOT NULL, "inventory_entry_id" integer, "item_id" integer, "batch_id" integer, CONSTRAINT "PK_319c8c006922118de3fd3b5cc46" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."inventory_entry_item"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."inventory_entry_item"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."inventory_entry_item"."quantity" IS 'Quantidade de cada item'; COMMENT ON COLUMN "pharmasys"."inventory_entry_item"."unit_price" IS 'Valor de cada item'`);
        await queryRunner.query(`CREATE INDEX "IDX_4ad1b6e872aedaf2cdd684897a" ON "pharmasys"."inventory_entry_item" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a54cdf462d7bf68731f78f672" ON "pharmasys"."inventory_entry_item" ("inventory_entry_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4bad392c4a72d8d36a0ba91818" ON "pharmasys"."inventory_entry_item" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3382e3fc2159ca5be813f64253" ON "pharmasys"."inventory_entry_item" ("batch_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory_entry_item" IS 'Tabela para cadastro de dados do item na entrada'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD CONSTRAINT "FK_5e334dad6f0fccd15569f4f6820" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD CONSTRAINT "FK_8d196f74d8444326306f7f4c3eb" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD CONSTRAINT "FK_ed908c80c627840723b9e3f2e6b" FOREIGN KEY ("company_id") REFERENCES "pharmasys"."company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD CONSTRAINT "FK_7926e4148bba345388fb78cd657" FOREIGN KEY ("entry_type_id") REFERENCES "pharmasys"."entry_item_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD CONSTRAINT "FK_427cb6067b91d7eb5c5792e3b28" FOREIGN KEY ("stock_location_id") REFERENCES "pharmasys"."stock_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" ADD CONSTRAINT "FK_8a54cdf462d7bf68731f78f672a" FOREIGN KEY ("inventory_entry_id") REFERENCES "pharmasys"."inventory_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" ADD CONSTRAINT "FK_4bad392c4a72d8d36a0ba91818f" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" ADD CONSTRAINT "FK_3382e3fc2159ca5be813f642538" FOREIGN KEY ("batch_id") REFERENCES "pharmasys"."batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" DROP CONSTRAINT "FK_3382e3fc2159ca5be813f642538"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" DROP CONSTRAINT "FK_4bad392c4a72d8d36a0ba91818f"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" DROP CONSTRAINT "FK_8a54cdf462d7bf68731f78f672a"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP CONSTRAINT "FK_427cb6067b91d7eb5c5792e3b28"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP CONSTRAINT "FK_7926e4148bba345388fb78cd657"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP CONSTRAINT "FK_ed908c80c627840723b9e3f2e6b"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP CONSTRAINT "FK_8d196f74d8444326306f7f4c3eb"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP CONSTRAINT "FK_5e334dad6f0fccd15569f4f6820"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory_entry_item" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3382e3fc2159ca5be813f64253"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4bad392c4a72d8d36a0ba91818"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_8a54cdf462d7bf68731f78f672"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4ad1b6e872aedaf2cdd684897a"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."inventory_entry_item"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."inventory_entry_item_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."inventory_entry" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_d63500d5cb49df1d10eff280a9"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_427cb6067b91d7eb5c5792e3b2"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_7926e4148bba345388fb78cd65"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ed908c80c627840723b9e3f2e6"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ce08cc8f87e3f3d2b71dcd4933"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_2858582d1072fd7da5547d30db"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_e1b81abcf3dca96e5a23a78562"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."inventory_entry"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."inventory_entry_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."entry_item_type" IS NULL`);
        await queryRunner.query(`DROP TABLE "pharmasys"."entry_item_type"`);
    }

}
