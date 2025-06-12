const { expect } = require('@playwright/test')



export class Api {
    constructor(request) {
        this.request = request
        this.token = undefined
    }



    async setToken() {

        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = 'Bearer ' + body.token

        console.log(this.token)

    }

    async getCompanyIdByName(companyName) {



        const response = await this.request.get('http://localhost:3333/companies', {
            headers: {
                Authorization: this.token,
            },
            params: {
                name: companyName
            }

        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        return body.data[0].id
    }


    async postMovie(movie) {

        const companyId = await this.getCompanyIdByName(movie.company)


        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
            }
        })

        expect(response.ok()).toBeTruthy()


    }

    async postSerie(serie) {
        const path = require('path');
        const fs = require('fs');
        const companyId = await this.getCompanyIdByName(serie.company);

        const filePath = path.resolve('tests', 'support', 'fixtures', 'covers', 'tvshows', serie.cover);

        const response = await this.request.post('http://localhost:3333/tvshows', {
            headers: {
                Authorization: this.token,
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: serie.title,
                overview: serie.overview,
                company_id: companyId,
                release_year: String(serie.release_year),
                featured: String(serie.featured),
                seasons: String(serie.season), 
                cover: fs.createReadStream(filePath)
            }
        });

        const body = await response.text(); // opcional para debug
        console.log(body); // imprime se ainda der erro

        expect(response.ok(), `Erro ao criar série: ${body}`).toBeTruthy();


    }

}