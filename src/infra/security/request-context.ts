import { Injectable, Scope, Inject } from '@nestjs/common';
import { Request } from 'express';
import {REQUEST} from "@nestjs/core";

@Injectable()
export class RequestContext {
  private readonly contextMap: Map<string, any> = new Map();

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  set<T>(key: string, value: T): void {
    this.contextMap.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.contextMap.get(key) as T;
  }

  getRequest(): Request {
    return this.request;
  }
}
