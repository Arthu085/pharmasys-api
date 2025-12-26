import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexForPatient1766754485785 implements MigrationInterface {
    name = 'AddUniqueIndexForPatient1766754485785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_patient_document_unique_when_not_deleted" ON "pharmasys"."patient" ("document") WHERE "deleted_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_patient_document_unique_when_not_deleted"`);
    }

}
