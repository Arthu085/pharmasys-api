import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStockLocationTable1761659509081 implements MigrationInterface {
    name = 'AddStockLocationTable1761659509081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."stock_location_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."stock_location" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."stock_location_status_enum" NOT NULL DEFAULT 'A', "name" character varying(100) NOT NULL, "code" character varying(50) NOT NULL, "is_central_stock" boolean NOT NULL DEFAULT false, "user_created_id" integer, "user_updated_id" integer, CONSTRAINT "UQ_eb4dd13579b6026ed0449f7a244" UNIQUE ("code"), CONSTRAINT "PK_adf770067d0df1421f525fa25cc" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."stock_location"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."stock_location"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."stock_location"."name" IS 'Nome do local de estoque'; COMMENT ON COLUMN "pharmasys"."stock_location"."code" IS 'Código do local de estoque'; COMMENT ON COLUMN "pharmasys"."stock_location"."is_central_stock" IS 'Verifica se é estoque central'`);
        await queryRunner.query(`CREATE INDEX "IDX_b26b82c1f1aeb232ca67d14f27" ON "pharmasys"."stock_location" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f798c40d30ad971fb049e26c3" ON "pharmasys"."stock_location" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e8b8a4b61649c6fa421258fae" ON "pharmasys"."stock_location" ("name", "code") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_location" IS 'Tabela para cadastro de locais de estoque'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" ADD CONSTRAINT "FK_8c7b7c29039c4989f01d7a68001" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" ADD CONSTRAINT "FK_b871fdee2b544a3c62ebc1f1be5" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" DROP CONSTRAINT "FK_b871fdee2b544a3c62ebc1f1be5"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" DROP CONSTRAINT "FK_8c7b7c29039c4989f01d7a68001"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."stock_location" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_5e8b8a4b61649c6fa421258fae"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3f798c40d30ad971fb049e26c3"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_b26b82c1f1aeb232ca67d14f27"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."stock_location"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."stock_location_status_enum"`);
    }

}
