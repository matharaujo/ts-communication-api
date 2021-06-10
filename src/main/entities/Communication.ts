import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm';

@Entity('communications')
class Communication extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type: 'timestamp', nullable: false})
    public dateSubmission: Date;

    @Column({nullable: false})
    public recipient: string;

    @Column({nullable: false})
    public message: string;

    @Column({nullable: true})
    public type: string;

    @Column({nullable: false})
    public approved: boolean;
}

export default Communication;
