import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Level } from 'src/core/level/domain/level.entity';

describe('Level Controler e2e', () => {
  let app: INestApplication;
  let levelId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create level (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/niveis')
      .send({
        nome: 'Junior',
      })
      .expect(201)
      .expect(({ body }) => {
        nome: body.nome;
      });

    levelId = response.body.id;
  });

  it('should find all level (GET)', () => {
    return request(app.getHttpServer())
      .get('/niveis')
      .expect(200)
      .expect(({ body }) =>
        body.map((nivel: Level) => {
          nome: nivel.nome;
        }),
      );
  });

  it('should find level by id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/niveis/${levelId}`)
      .expect(200)
      .expect(({ body }) => {
        nome: body.nome;
      });
  });

  it('should update level by id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/niveis/${levelId}`)
      .send({
        nome: 'Senior',
      })
      .expect(200)
      .expect(({ body }) => {
        nome: body.nome;
      });
  });

  it('should remove level by id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/niveis/${levelId}`)
      .expect(200)
      .expect({ message: 'Nivel removido com sucesso!', deleted: true });
  });
});
