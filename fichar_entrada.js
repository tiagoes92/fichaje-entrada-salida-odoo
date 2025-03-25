const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
        // Ir a la página de login
        await page.goto('https://erp.teknei.es/web/login');

        // Esperar que los campos estén disponibles
        await page.waitForSelector('input[name="login"]');
        await page.waitForSelector('input[name="password"]');

        // Ingresar usuario y contraseña
        await page.fill('input[name="login"]', process.env.ERP_USER);
        await page.fill('input[name="password"]', process.env.ERP_PASS);

        // Enviar formulario de login
        await Promise.all([
            page.waitForNavigation(),
            page.click('button[type="submit"]')
        ]);

        console.log('✅ Login exitoso');

        // Esperar al dashboard o módulo principal
        //await page.waitForSelector('text=Inicio');

        // Ir al módulo de fichaje (esto depende de cómo esté configurado tu Odoo)
        // Si conoces la URL exacta, ponla aquí:
        await page.goto('https://erp.teknei.es/web#cids=78&menu_id=327&action=460');

        // Esperar a que cargue el botón de fichar (clase: btn btn-success)
        //await page.waitForSelector('button.btn.btn-success');

        // Hacer clic en el botón de fichar
        await page.click('button.btn.btn-success');
        console.log('✅ Botón de fichar pulsado');

        // (Opcional) captura del estado
        //await page.screenshot({ path: 'fichaje.png' });

    } catch (error) {
        console.error('❌ Error durante el proceso:', error.message);
    } finally {
        await browser.close();
    }
})();