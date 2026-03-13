import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// JwtAuthGuard protects routes by verifying the JWT token
// If the token is valid, the request is allowed to continue
@Injectable()
export class JwtAuthGuard implements CanActivate {

  // Inject JwtService to verify tokens
  constructor(private jwtService: JwtService) {}

  // canActivate() runs before the route handler executes
  // It determines whether the request is allowed or blocked
  canActivate(context: ExecutionContext): boolean {

    // Get the HTTP request object
    const request = context.switchToHttp().getRequest()

    // Extract JWT token from cookies
    const token = request.cookies?.token

    // If no token exists, deny access
    if (!token) {
      throw new UnauthorizedException('Token missing')
    }

   try {

  // Verify the token using the JWT secret
  const decoded = this.jwtService.verify(token)

  // Attach decoded user data to the request object
  // This allows controllers to access request.user
  request.user = decoded

  // Allow request to proceed
  return true

} catch (err) {

  // If token is expired, return specific error
  if (err.name === 'TokenExpiredError') {
    throw new UnauthorizedException('Token expired')
  }

  // If token is invalid or corrupted
  throw new UnauthorizedException('Invalid token')
}
  }
}