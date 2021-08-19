import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';

@Injectable()
export class EnsureAuthenticatedMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HttpException('JWT token is missing!', HttpStatus.BAD_REQUEST);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, '36v90xkwbv7409wkvnbxle65gh5892nv60');

      const { sub } = decoded;

      req.user = { id: sub };

      return next();
    } catch {
      throw new HttpException('Invalid JWT token!', HttpStatus.BAD_REQUEST);
    }
  }
}
