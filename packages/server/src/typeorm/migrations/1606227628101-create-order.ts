import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrder1606227628101 implements MigrationInterface {
    name = 'createOrder1606227628101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid, "productId" uuid, CONSTRAINT "PK_0fd87b790d35ac255b17f6a3bd1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalPrice" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "costumerId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "FK_dbffa0e72d9de7f8b08c83df153" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_items" ADD CONSTRAINT "FK_a64e204bf61651554cedd2988f1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b05c0b45b7c1117d541cb277fb7" FOREIGN KEY ("costumerId") REFERENCES "costumers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b05c0b45b7c1117d541cb277fb7"`);
        await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_a64e204bf61651554cedd2988f1"`);
        await queryRunner.query(`ALTER TABLE "orders_items" DROP CONSTRAINT "FK_dbffa0e72d9de7f8b08c83df153"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_items"`);
    }

}
