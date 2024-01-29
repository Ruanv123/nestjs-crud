import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/services/db/db.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly db: DbService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const userAlreadyExist = await this.db.user.findFirst({
            where: { email: createUserDto.email },
        });

        if (userAlreadyExist) {
            throw new HttpException('User already exist', HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.db.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: hashedPassword,
            },
        });
    }

    async findAll(): Promise<User[]> {
        return await this.db.user.findMany();
    }

    async findOne(id: number): Promise<User> {
        return await this.db.user.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.db.user.findUnique({
            where: { email },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const userAlreadyExist = await this.db.user.findUnique({
            where: { id },
        });

        if (!userAlreadyExist) {
            throw new HttpException('User not exists', HttpStatus.NOT_FOUND);
        }

        const emailAlreadyExist = await this.db.user.findFirst({
            where: { email: updateUserDto.email },
        });

        if (emailAlreadyExist) {
            throw new HttpException(
                'Email already in use',
                HttpStatus.CONFLICT,
            );
        }

        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserDto.password,
                10,
            );

            updateUserDto.password = hashedPassword;
        }

        return await this.db.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
    }

    async remove(id: number) {
        await this.db.user.delete({ where: { id } });
        return;
    }
}
