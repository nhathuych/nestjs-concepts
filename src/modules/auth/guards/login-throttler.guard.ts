import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { ThrottlerException, ThrottlerGuard, ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler';

@Injectable()
export class LoginThrottlerGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    super(options, storageService, reflector);
  }

  /**
   * Override the default tracker.
   * By default, Throttler uses the request IP address (req.ip).
   * Here we track attempts based on the email address instead, so each user/email has its own rate limit regardless of IP.
   */
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const email = req.body?.email || 'anonymous';
    return `login-${email}`;
  }

  /**
   * Override the request limit.
   * This sets the maximum number of attempts allowed within the defined TTL window.
   */
  protected getLimit(): Promise<number> {
    return Promise.resolve(
      this.configService.get<number>('LOGIN_THROTTLE_LIMIT', 5),
    );
  }

  /**
   * Override the time-to-live (TTL) window.
   * This defines the duration (in ms) for which the limit applies.
   */
  protected getTtl(): Promise<number> {
    return Promise.resolve(
      this.configService.get<number>('LOGIN_THROTTLE_TTL', 60000),  // 1 minute
    );
  }

  /**
   * Override the exception thrown when the rate limit is exceeded.
   * Customize the error message for login-specific context.
   */
  protected async throwThrottlingException(): Promise<void> {
    const loginThrottleTtl = this.configService.get<number>('LOGIN_THROTTLE_TTL', 60000) / 1000;
    throw new ThrottlerException(`Too many attempts. Please try again after ${loginThrottleTtl} seconds!`);
  }
}
