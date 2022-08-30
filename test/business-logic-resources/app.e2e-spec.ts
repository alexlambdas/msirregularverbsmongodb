import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MockAppModule } from './MockApp.module';


describe('Module common-resources-mongodb (e2e)', () => {

    let app: INestApplication;
    let httpServer: any; // unica instancia del servidor http para todos los test


    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [MockAppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();

        httpServer = app.getHttpServer();
    });


    /**
     * 
     * 
     * 
     * 
     */

    it('/ (GET_ALL) - success - http/200', () => {
        return request(httpServer)
            .get('/app/rs/portfolio/msirregularverbsmongodb/crud/GET_ALL')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (GET_BY_ID) - success - http/200', () => {
        return request(httpServer)
            .get('/app/rs/portfolio/msirregularverbsmongodb/crud/GET_BY_ID/630bfc8bc221367c6deae074')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (GET_BY_ID) - success - http/200', () => {
        return request(httpServer)
            .get('/app/rs/portfolio/msirregularverbsmongodb/crud/GET_BY_PARAMS/?baseForm=bend')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (POST) - success - http/200', () => {
        return request(httpServer)
            .post('/app/rs/portfolio/msirregularverbsmongodb/crud/POST')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "blow", 
                    "pastSimple": "blew",
                    "pastParticiple": "blown", 
                    "traduction": "soplar"
                }
            )
            .expect(201)
    });

    it('/ (DELETE_ONE) - success - http/200', () => {
        return request(httpServer)
            .del('/app/rs/portfolio/msirregularverbsmongodb/crud/DELETE_ONE/630bfc8bc221367c6deae074')
            .set('transactionid', 'PA20220131000005')
            .expect(200)
    });

    it('/ (UPDATE_ONE) - success - http/200', () => {
        return request(httpServer)
            .put('/app/rs/portfolio/msirregularverbsmongodb/crud/UPDATE_ONE/630bfdb2c221367c6deae07a')
            .set('transactionid', 'PA20220131000005')
            .send(
                {
                    "baseForm": "buy", 
                    "pastSimple": "bought",
                    "pastParticiple": "bought", 
                    "traduction": "comprar"
                }
            )
            .expect(200)
    });
    
});
