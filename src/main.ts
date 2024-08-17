import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5050;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("LinkApp API Documentation")
    .setDescription("https://api.linkapp.org/")
    .setVersion("1.0.0")
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

start();