import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1714522878808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" RENAME COLUMN "name" TO "fullname"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users" RENAME COLUMN "fullname" TO "name"`,
        )
    }

}
