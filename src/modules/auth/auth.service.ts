import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string) {
        if (!email || !pass) throw new ForbiddenException();

        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new NotFoundException('not found user by email');
        }

        const passwordsMatch = await bcrypt.compare(pass, user.password);

        if (!passwordsMatch) {
            throw new UnauthorizedException('incorret password');
        }

        const payload = { sub: user.id, name: user.name, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
