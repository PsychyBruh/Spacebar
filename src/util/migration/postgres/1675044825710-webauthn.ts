/*
	Spacebar: A FOSS re-implementation and extension of the Discord.com backend.
	Copyright (C) 2023 Spacebar and Spacebar Contributors
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published
	by the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.
	
	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { MigrationInterface, QueryRunner } from "typeorm";

export class webauthn1675044825710 implements MigrationInterface {
	name = "webauthn1675044825710";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "security_keys" ("id" character varying NOT NULL, "user_id" character varying, "key_id" character varying NOT NULL, "public_key" character varying NOT NULL, "counter" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_6e95cdd91779e7cca06d1fff89c" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "webauthn_enabled" boolean NOT NULL DEFAULT false`,
		);
		await queryRunner.query(
			`ALTER TABLE "security_keys" ADD CONSTRAINT "FK_24c97d0771cafedce6d7163eaad" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "security_keys" DROP CONSTRAINT "FK_24c97d0771cafedce6d7163eaad"`,
		);
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "webauthn_enabled"`,
		);
		await queryRunner.query(`DROP TABLE "security_keys"`);
	}
}
