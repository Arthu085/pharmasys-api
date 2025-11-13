import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexForPrescriptor1763041097519 implements MigrationInterface {
    name = 'AddUniqueIndexForPrescriptor1763041097519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_prescriptor_registration_advice_unique_when_not_deleted" ON "pharmasys"."prescriptor" ("registration_number", "advice_id") WHERE "deleted_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" ADD CONSTRAINT "FK_967785873320a17c1f756b7e70b" FOREIGN KEY ("user_updated_id") REFERENCES "pharmasys"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pharmasys"."user" DROP CONSTRAINT "FK_967785873320a17c1f756b7e70b"`);
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_prescriptor_registration_advice_unique_when_not_deleted"`);
    }

}
