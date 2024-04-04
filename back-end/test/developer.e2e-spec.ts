import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { Developer } from 'src/core/developer/domain/developer.entity';

describe('Developer Controler e2e', () => {
  let app: INestApplication;
  let developerId: number;
  let levelId: number;
  let developer: Developer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create level (POST)', async () => {
    const level = {
      nome: 'Senior',
    };

    const response = await request(app.getHttpServer())
      .post('/niveis')
      .send(level)
      .expect(201)
      .expect(() => {
        nome: level.nome;
      });

    levelId = response.body.id;
  });

  it('should create developer (POST)', async () => {
    const data = {
      nome: 'João da Silva',
      nivelId: levelId,
      sexo: 'M',
      datadenascimento: '1990-05-15',
      hobby: 'programação',
    };
    const response = await request(app.getHttpServer())
      .post('/desenvolvedores')
      .send(data)
      .expect(201)
      .expect(() => {
        nome: data.nome;
        nivelId: data.nivelId;
        sexo: data.sexo;
        datadenascimento: new Date(data.datadenascimento);
        hobby: data.hobby;
      });

    developerId = response.body.id;
    developer = response.body;
  });

  it('should find all developer (GET)', () => {
    return request(app.getHttpServer())
      .get('/desenvolvedores')
      .expect(200)
      .expect(({ body }) =>
        body.map((developer: Developer) => {
          nome: developer.nome;
          nivelId: developer.nivelId;
          sexo: developer.sexo;
          datadenascimento: developer.datadenascimento;
          hobby: developer.hobby;
        }),
      );
  });

  it('should find developer by id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/desenvolvedores/${developerId}`)
      .expect(200)
      .expect(() => developer);
  });

  it('should update developer by id (PUT)', () => {
    const updateData = {
      nome: 'Xuxa da Silva',
      nivelId: levelId,
      sexo: 'F',
      datadenascimento: '1990-05-16',
      hobby: 'surf',
    };

    return request(app.getHttpServer())
      .put(`/desenvolvedores/${developerId}`)
      .send(updateData)
      .expect(200)
      .expect(() => updateData);
  });

  it('should remove developer by id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/desenvolvedores/${developerId}`)
      .expect(200)
      .expect({
        message: 'Desenvolvedor removido com sucesso!',
        deleted: true,
      });
  });
});
