import {EntityRepository, Repository} from 'typeorm';
import Communication from '../../entities/Communication';

@EntityRepository(Communication)
export class CommunicationRepository extends Repository<Communication> {

    public async removeById(id: number) {
        const itemToRemove: Communication | undefined = await this.findOne({id});
        return this.manager.remove(itemToRemove);
    }

    public findOneById(id: number) {
        return this.manager.findOne(Communication, {where: {id}});
    }

}