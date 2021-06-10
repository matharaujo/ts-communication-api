import {getCustomRepository} from 'typeorm';
import Communication from '../../entities/Communication';
import {CommunicationRepository} from '../repository/communication-repository';

export class CommunicationService {

    public async findOneById(id: number): Promise<Communication | null> {
        let communication;
        try {
            communication = await getCustomRepository(CommunicationRepository).findOneById(id);
        } catch (error) {
            communication = null;
        }
        // @ts-ignore
        return communication;
    }

    public find(): Promise<Communication[]> {
        return getCustomRepository(CommunicationRepository).find();
    }

    public removeById(id: number): Promise<Communication | undefined> {
        return getCustomRepository(CommunicationRepository).removeById(id);
    }

    public save(communication: Communication): Promise<Communication> {
        return getCustomRepository(CommunicationRepository).save(communication);
    }

}
