import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntityInTransferRequestItem1768478802022 implements MigrationInterface {
    name = 'AddUserEntityInTransferRequestItem1768478802022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD "user_created_id" integer`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD "user_updated_id" integer`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD CONSTRAINT "FK_34c7c128da266419b55f95b9753" FOREIGN KEY ("user_created_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD CONSTRAINT "FK_5e83b2126fccd31ad7639bd49c4" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP CONSTRAINT "FK_5e83b2126fccd31ad7639bd49c4"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP CONSTRAINT "FK_34c7c128da266419b55f95b9753"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP COLUMN "user_updated_id"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP COLUMN "user_created_id"`);
    }

}
