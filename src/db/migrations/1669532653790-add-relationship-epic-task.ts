import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelationshipEpicTask1669532653790 implements MigrationInterface {
    name = 'addRelationshipEpicTask1669532653790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "epicId" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_cb94cc30c70c40ea34347d3b438" FOREIGN KEY ("epicId") REFERENCES "epics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_cb94cc30c70c40ea34347d3b438"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "epicId"`);
    }

}
