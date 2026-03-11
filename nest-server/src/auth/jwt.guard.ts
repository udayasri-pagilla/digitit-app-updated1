
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest()

    const token = request.cookies?.token

    if (!token) {
      throw new UnauthorizedException('Token missing')
    }

   try {

  const decoded = this.jwtService.verify(token)

  request.user = decoded

  return true

} catch (err) {

  if (err.name === 'TokenExpiredError') {
    throw new UnauthorizedException('Token expired')
  }

  throw new UnauthorizedException('Invalid token')
}
  }
}