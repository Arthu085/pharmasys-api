import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSoftDelete1761930384075 implements MigrationInterface {
    name = 'AddSoftDelete1761930384075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."role" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_reason" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."type" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."presentation" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."dosage" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."subtype" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company_type" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."advice" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."exit_item_type" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."entry_item_type" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry_item" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_entry" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."entry_item_type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory-exit-item" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."inventory_exit" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."exit_item_type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation_item" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item_dispensation" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."patient" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."advice" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_balance" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer_item" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."batch" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."company_type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_transfer" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request_item" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."item" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."subtype" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."dosage" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."presentation" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."type" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_request" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."transfer_reason" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."stock_location" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."role" DROP COLUMN "deleted_at"`);
    }

}
