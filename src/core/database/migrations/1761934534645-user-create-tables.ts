import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreateTables1761934534645 implements MigrationInterface {
    name = 'UserCreateTables1761934534645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "pharmasys"."role_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."role" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "status" "pharmasys"."role_status_enum" NOT NULL DEFAULT 'A', "name" character varying(50) NOT NULL, CONSTRAINT "UQ_16fc336b9576146aa1f03fdc7c5" UNIQUE ("uuid"), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."role"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."role"."status" IS 'Status da entidade (A-Ativo, I-Inativo)'; COMMENT ON COLUMN "pharmasys"."role"."name" IS 'Nome da função'`);
        await queryRunner.query(`CREATE INDEX "IDX_16fc336b9576146aa1f03fdc7c" ON "pharmasys"."role" ("uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_06ccdafcccf342078162c12753" ON "pharmasys"."role" ("status") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."role" IS 'Tabela para cadastro de funções'`);
        await queryRunner.query(`CREATE TYPE "pharmasys"."user_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pharmasys"."user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "status" "pharmasys"."user_status_enum" NOT NULL DEFAULT 'A', "user_updated_id" integer, "name" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(255) NOT NULL, "role_id" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")); COMMENT ON COLUMN "pharmasys"."user"."uuid" IS 'Identificador único universal'; COMMENT ON COLUMN "pharmasys"."user"."status" IS 'Status do usuário'; COMMENT ON COLUMN "pharmasys"."user"."name" IS 'Nome do usuário'; COMMENT ON COLUMN "pharmasys"."user"."email" IS 'Email do usuário'; COMMENT ON COLUMN "pharmasys"."user"."password" IS 'Senha do usuário'`);
        await queryRunner.query(`CREATE INDEX "IDX_3d44ccf43b8a0d6b9978affb88" ON "pharmasys"."user" ("status") `);
        await queryRunner.query(`CREATE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "pharmasys"."user" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb2e442d14add3cefbdf33c456" ON "pharmasys"."user" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_65d94d83bbcb43e809fcd82632" ON "pharmasys"."user" ("name", "email", "role_id") `);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."user" IS 'Tabela para cadastro de usuários'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "pharmasys"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."user" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_65d94d83bbcb43e809fcd82632"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_fb2e442d14add3cefbdf33c456"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_065d4d8f3b5adb4a08841eae3c"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_3d44ccf43b8a0d6b9978affb88"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."user"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."user_status_enum"`);
        await queryRunner.query(`COMMENT ON TABLE "pharmasys"."role" IS NULL`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_06ccdafcccf342078162c12753"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_16fc336b9576146aa1f03fdc7c"`);
        await queryRunner.query(`DROP TABLE "pharmasys"."role"`);
        await queryRunner.query(`DROP TYPE "pharmasys"."role_status_enum"`);
    }

}
