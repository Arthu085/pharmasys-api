import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteColumnInUser1762352139491 implements MigrationInterface {
    name = 'AddDeleteColumnInUser1762352139491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."user"."deleted_at" IS 'Data de exclusão da entidade'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "pharmasys"."user"."deleted_at" IS 'Data de exclusão da entidade'`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" DROP COLUMN "deleted_at"`);
    }

}
