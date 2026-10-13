import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity.js';
import { PasswordHasher } from '@nestjs/authentication';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserProfileEntity } from './entities/profile.entity.js';

@Injectable()
export class UsersService {
  
  constructor(private readonly passwordHasher: PasswordHasher,
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(UserProfileEntity) private profileRepository: Repository<UserProfileEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = this.usersRepository.create({ email: dto.email, passwordHash });
    const savedUser =  await this.usersRepository.save(user);

    const profile = this.profileRepository.create({email: dto.email, firstName: dto.firstName, lastName: dto.lastName, user: savedUser});
    const savedProfile = await this.profileRepository.save(profile);

    savedUser.profile = savedProfile;

    return savedUser;

  }

  async findProfilebyUserId(userId: number) {
    // return await this.profileRepository.findOne({where: { userId }});
    return await this.profileRepository.createQueryBuilder('t_profile')
    .where('t_profile.userId = :userId', { userId: userId })
    .getOne();

  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    const hashedRefreshToken = refreshToken ? await this.passwordHasher.hash(refreshToken) : null;
    await this.usersRepository.update(userId, {hashedRefreshToken : (hashedRefreshToken ? hashedRefreshToken : '') });
  }
}
