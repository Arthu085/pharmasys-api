import { MigrationInterface, QueryRunner } from "typeorm";

export class BatchCreateTables1761934590632 implements MigrationInterface {
    name = 'BatchCreateTables1761934590632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."batch_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."batch" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."batch_status_enum" NOT NULL DEFAULT 'A', "batch_code" character varying(90) NOT NULL, "expiration_date" date NOT NULL, "user_created_id" integer, "user_updated_id" integer, "item_id" integer, "company_id" integer, CONSTRAINT "UQ_fa94ae7db217b0a28eba8c11c10" UNIQUE ("uuid"), CONSTRAINT "UQ_92e8e8867845483820a82e3724d" UNIQUE ("batch_code"), CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."batch"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."batch"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."batch"."batch_code" IS 'Código do lote'; COMMENT ON COLUMN "pharmasys"."batch"."expiration_date" IS 'Data de expiração'`);
        await queryRunner.query(`CREATE INDEX "IDX_fa94ae7db217b0a28eba8c11c1" ON "pharmasys"."batch" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_cfea8cb6e387bc8738a456865b" ON "pharmasys"."batch" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be0d33148594e732642334336" ON "pharmasys"."batch" ("item_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_af935805ad2c82d42c9c160fb2" ON "pharmasys"."batch" ("company_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_92e8e8867845483820a82e3724" ON "pharmasys"."batch" ("batch_code") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb92aef269bdb6a6c84720fa" ON "pharmasys"."batch" ("item_id", "company_id", "batch_code") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."batch" IS 'Tabela para cadastro de lotes'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "FK_39e442c989cb7eecdbe0cb48b33" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "FK_07565805e19f9fc90f3824e2e26" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "FK_4be0d33148594e7326423343360" FOREIGN KEY ("item_id") REFERENCES "pharmasys"."item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD CONSTRAINT "FK_af935805ad2c82d42c9c160fb29" FOREIGN KEY ("company_id") REFERENCES "pharmasys"."company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "FK_af935805ad2c82d42c9c160fb29"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "FK_4be0d33148594e7326423343360"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "FK_07565805e19f9fc90f3824e2e26"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP CONSTRAINT "FK_39e442c989cb7eecdbe0cb48b33"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."batch" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3fbb92aef269bdb6a6c84720fa"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_92e8e8867845483820a82e3724"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_af935805ad2c82d42c9c160fb2"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_4be0d33148594e732642334336"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_cfea8cb6e387bc8738a456865b"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fa94ae7db217b0a28eba8c11c1"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."batch"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."batch_status_enum"`);
    }

}
