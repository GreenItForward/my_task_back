import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/api/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<string | never> {
    const { firstname, name, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOneBy({ email })

    if (user) {
      throw new HttpException(`User with email ${email} already exists`, HttpStatus.BAD_REQUEST);
    }

    user = new User();

    user.firstname = firstname;
    user.name = name;
    user.email = email;
    user.password = this.helper.encodePassword(password);
    await this.repository.save(user);

    return this.helper.generateToken(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.repository.findOneBy({ email });

    if (!user) {
      throw new HttpException('That email/username and password combination didn\'t work', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('That email/username and password combination didn\'t work', HttpStatus.NOT_FOUND);
    }

    await this.repository.update(user.id, {lastLoginAt: new Date()});

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {    

    await this.repository.update(user.id, {lastLoginAt: new Date()});

    return this.helper.generateToken(user);
  }

  public getUser(user: User): User {
    return user;
  }

  public async getUserById(userId: number): Promise<User> {
    return this.repository.findOneBy({ id: userId });
  }
  
}