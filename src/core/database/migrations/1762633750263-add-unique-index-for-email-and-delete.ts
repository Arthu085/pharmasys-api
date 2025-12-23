import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexForEmailAndDelete1762633750263 implements MigrationInterface {
    name = 'AddUniqueIndexForEmailAndDelete1762633750263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_65d94d83bbcb43e809fcd82632"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_user_email_unique_when_not_deleted" ON "pharmasys"."user" ("email") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_65d94d83bbcb43e809fcd82632" ON "pharmasys"."user" ("name", "email", "role_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_65d94d83bbcb43e809fcd82632"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_user_email_unique_when_not_deleted"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`CREATE INDEX "IDX_65d94d83bbcb43e809fcd82632" ON "pharmasys"."user" ("name", "email", "role_id") `);
    }

}
