import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRequestCommunicationsTable1623213244724 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(new Table ({
            name: 'communications',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'dateSubmission',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'recipient',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'message',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'approved',
                    type: 'boolean',
                    default: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('communications');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
