import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

function validate(request: Request): boolean {
  const authHeader = request.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    return false;
  }
  const [type, credentials] = authHeader.split(' ');
  console.log(type, credentials);

  if (type !== 'Basic:' || !credentials) {
    return false;
  }

  const [email, password] = authHeader.split(':');
  console.log(email, password);

  if (!email || !password) {
    return false;
  }
  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validate(request);
  }
}
