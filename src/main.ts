import {NestFactory} from '@nestjs/core';
import {AppModule} from "./infra/nest/app.module";
import {otelSDK} from "@/src/infra/nest/tracing";

async function bootstrap() {
  await otelSDK.start();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
