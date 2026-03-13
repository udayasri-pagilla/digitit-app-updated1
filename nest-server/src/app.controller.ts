import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// AppController handles the root-level routes of the application
// Example: GET /
@Controller()
export class AppController {

  // Inject AppService using Dependency Injection
  constructor(private readonly appService: AppService) {}

  // -------------------------
  // ROOT ENDPOINT
  // GET /
  // -------------------------
  @Get()
  async getHello() {

    // Calls AppService to return a basic response message
    return this.appService.getHello()
  }
}