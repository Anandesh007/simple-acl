import {repository} from '@loopback/repository';
import {post, requestBody, HttpErrors} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'mysecretkey';

export class AuthController {
  constructor(@repository(UserRepository) public userRepo: UserRepository) {}

  @post('/login')
  async login(
    @requestBody() credentials: {username: string; password: string},
  ): Promise<object> {
    const user = await this.userRepo.findOne({
      where: {username: credentials.username, password: credentials.password},
    });

    if (!user) throw new HttpErrors.Unauthorized('Invalid credentials');

    const token = jwt.sign(
      {id: user.id, role: user.role},
      JWT_SECRET,
      {expiresIn: '1h'},
    );
    
    return {token, role: user.role};
  }
}
