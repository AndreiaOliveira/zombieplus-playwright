const { expect } = require('@playwright/test')

export class Movies {

    constructor(page) {
        this.page = page
    }


    async goForm() {
        await this.page.locator('a[href="/admin/movies/register"]').click() //formulario
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click() //clica no botão de cadastrar
    }

    async create(title, overview, company, release_year, cover, featured) {

        await this.goForm()

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

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures/covers/movies/' + cover) // upload da imagem

        if (featured) {   //se o filme tiver featured = true deixa ele em destaque 
            await this.page.locator('.featured .react-switch').click();
        }

        await this.submit()

    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click() //vai checar na tabela o filme pelo titulo e clicar no botão da lixeira do filme
        await this.page.click('.confirm-removal') //clique na tooltip
    }

}