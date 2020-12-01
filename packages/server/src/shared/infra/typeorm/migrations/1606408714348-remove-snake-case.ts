import {MigrationInterface, QueryRunner} from "typeorm";

export class removeSnakeCase1606408714348 implements MigrationInterface {
    name = 'removeSnakeCase1606408714348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "image_url" TO "imageUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "imageUrl" TO "image_url"`);
    }

}
