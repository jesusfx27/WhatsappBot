const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const FlowBienvenida = addKeyword(EVENTS.WELCOME)
    .addAnswer([
        "Hola. solo estoy diseñado para dar informacion basica sobre nosotros🤖",
        "y se que estas aqui por eso",
        "asi que, en resumen...",

        "\nRealizamos las jugadas de la manera mas tradicional posible",

        "\nel precio del carton es de 1🥬",

        "\n📺las jugadas se realizan cada domingo a las 6.30pm por nuestro canal de youtube",
        
        "\nlos cartones se escogen en un link",
       
        "\n💰Cada carton suma al total a repartir",
       
        "\n📱Pagos a travez de pago movil",
    ]
               {delay: 500})
    .addAnswer(
        "escribe 1️⃣ para continuar",
         {delay: 500}
       )

const FlowFormasDeganar = addKeyword ("1")
    .addAnswer([
        "*Formas de Ganar*:",
        "-Diagonal de la B a O",
        "-Diagonal de la O a  B",
        "-4 Esquinas",
        "-Cruz grande",
        "-Linea vertical",
        "-Linea Horizontal",
        "-Carton lleno"],{media: "https://bingove.com/images/formas-de-ganar.png"})

        .addAnswer("*NOTA*: las lineas vertical y horizontal, se pueden dar en cualquier parte del carton, y su carton participa por todos los premios")
        .addAnswer(
            "escribe 2️⃣ para continuar",
            )

const FlowComoCantoBingo = addKeyword("2")
    .addAnswer([
        "nuestro sistema esta totalmente automatizado💻",
        "al momento de tener un ganador",
        "mostraremos el carton en pantalla",
        "junto con su nombre",
        "*(en vivo)*",
        "y de no estar presente, nosotros le llamaremos",
        "en este video explico el porque 👇",])

    .addAnswer("https://www.youtube.com/watch?v=83E4cPasiTQ")
    .addAnswer(
        "escribe 3️⃣ para proceder a comprar"
      )

const FlowComprar = addKeyword("3")
    .addAnswer([
        "en caso de tener dudas, aclaralas con el promotor",
        "que te facilitaremos con este link 👇 antes de comprar el carton"
    ])
    .addAnswer("bingove.com/info")
    .addAnswer("Recuerda guardar el numero de ese promotor, ya que este bot es solo para dar informacion basica de nuestro sistema")
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([FlowBienvenida, FlowComoCantoBingo,FlowFormasDeganar, FlowComprar])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
