const { expect } = require('@playwright/test')

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        //Função está aqui para seguir o PO puro, visto que para validar se o usuario esta logado é na pagina de movies
        await this.page.waitForLoadState('networkidle') //espera o trafego de rede acontecer
        await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')  //espero estar nessa tela ao logar
        //await expect(this.page).toHaveURL(/.*admin/)  //usando expressão regular (boa pratica) 
    }

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href="/admin/movies/register"]').click() //formulario

        //await this.page.locator('#title').fill(title) //pelo id
        //await this.page.locator('input[name=title]').fill(title) //pelo name

        await this.page.getByLabel('Titulo do filme').fill(title) //funciona se o label tem o mesmo nome do que o id
        await this.page.getByLabel('Sinopse').fill(overview) //funciona se o label tem o mesmo nome do que o id
        await this.page.locator('#select_company_id .react-select__indicator').click()

        // const html = await this.page.content()
        // console.log(html) //pegando o html que nao da para inspecionar

        await this.page.locator('.react-select__option').filter({ hasText: company }).click() //seleciona a empresa

        await this.page.locator('#select_year .react-select__indicator').click()
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click() //seleciona o ano

        await this.page.getByRole('button', {name: 'Cadastrar'}).click() //clica no botão de cadastrar
    }

}