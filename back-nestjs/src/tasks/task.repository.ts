import { DataSource, Repository } from "typeorm";
import { TaskEntity } from "./task.entity.js";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepository extends Repository<TaskEntity>{

    constructor(private dataSource: DataSource){
        super(TaskEntity, dataSource.createEntityManager());
    }

    findTasksByUserId(userId: number){
        const query = this.createQueryBuilder('t_tasks');
        query.andWhere('t_tasks.authorId = :authrId', {authrId: userId});

        return query.getMany();
    }

    findById( id: number ) {
        const query = this.createQueryBuilder('t_tasks');
        query.andWhere('t_tasks.id = :id', {id: id});
        query.leftJoinAndSelect('t_tasks.author', 'author')

        return query.getOne();
    }

    // getPosts(queryOptions: QueryPostDto) {
    //     const {title, status} = queryOptions;
    //     const query = this.createQueryBuilder('t_post');

    //     if(status) {
    //         query.andWhere('t_post.post_status = :status', {status: status});
    //     }

    //     if(title) {
    //         query.andWhere('LOWER(t_post.post_title) LIKE :title ', {title: `${title.trim().toLowerCase()}%`});
    //     }

    //     query.leftJoinAndSelect('t_post.category', 'category')

    //     return query.getMany();
    // }
}