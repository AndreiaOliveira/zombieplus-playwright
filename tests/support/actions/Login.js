const { expect } = require('@playwright/test')


export class Login {

    constructor(page) {
        this.page = page
    }

    async do(email, password, userName){
        this.visit()
        this.submit(email, password)
        this.isLoggedIn(userName)
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form') //identificando o formulario
        await expect(loginForm).toBeVisible()
    }

    async submit(email, password){

        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(password)
        await this.page.getByText('Entrar').click()
    }


    async alertEmailHaveText(text){
        const alert = this.page.locator('.email-alert')
        await expect(alert).toHaveText(text)
    }

    async alertPasswordHaveText(text){
        const alert = this.page.locator('.password-alert')
        await expect(alert).toHaveText(text)
    }

    async isLoggedIn(userName) {
            // //ATUALIZAÇÃO: VIOLANDO O PO PARA USAR O PADRÃO CUSTOM ACTIONS
            // //Função está aqui para seguir o PO puro, visto que para validar se o usuario esta logado é na pagina de movies
            // await this.page.waitForLoadState('networkidle') //espera o trafego de rede acontecer
            // await expect(this.page).toHaveURL('http://localhost:3000/admin/movies')  //espero estar nessa tela ao logar
            // //await expect(this.page).toHaveURL(/.*admin/)  //usando expressão regular (boa pratica) 

        
            // pega a mensagem de boas vindas
            const loggedUser = this.page.locator('.logged-user')
            await expect(loggedUser).toHaveText(`Olá, ${userName}`)



    }


 
}