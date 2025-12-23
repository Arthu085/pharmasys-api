import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserCreatedInUserEntity1763141819607 implements MigrationInterface {
    name = 'AddUserCreatedInUserEntity1763141819607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" ADD "user_created_id" integer`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" ADD CONSTRAINT "FK_2e0b0c6b365d0bd9653c2b8ea43" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" DROP CONSTRAINT "FK_2e0b0c6b365d0bd9653c2b8ea43"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" DROP COLUMN "user_created_id"`);
    }

}
