import { MigrationInterface, QueryRunner } from "typeorm";

export class RetiradoRegistrationNumberComoUnico1759595324242 implements MigrationInterface {
    name = 'RetiradoRegistrationNumberComoUnico1759595324242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ce705d727528348ea7bc0dbc75"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" DROP CONSTRAINT "UQ_00149dafd65606b748d5bd30674"`);
        await queryRunner.query(`CREATE INDEX "IDX_ce705d727528348ea7bc0dbc75" ON "pharmasys"."prescriptor" ("name", "registration_number", "advice_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "pharmasys"."IDX_ce705d727528348ea7bc0dbc75"`);
        await queryRunner.query(`ALTER TABLE "pharmasys"."prescriptor" ADD CONSTRAINT "UQ_00149dafd65606b748d5bd30674" UNIQUE ("registration_number")`);
        await queryRunner.query(`CREATE INDEX "IDX_ce705d727528348ea7bc0dbc75" ON "pharmasys"."prescriptor" ("name", "registration_number", "advice_id") `);
    }

}
