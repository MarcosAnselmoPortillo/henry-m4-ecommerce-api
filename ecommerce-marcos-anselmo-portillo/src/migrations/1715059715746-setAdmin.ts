import { MigrationInterface, QueryRunner } from "typeorm";

export class SetAdmin1715059715746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE users SET "isAdmin" = true WHERE "id" = 'a8ffdf35-726e-4279-991b-7ef09d675eaa'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE users SET "isAdmin" = false WHERE "id" = 'a8ffdf35-726e-4279-991b-7ef09d675eaa'`);
    }

}
