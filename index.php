<!DOCTYPE html>
<html lang="pt-BR">
<head>    
    <meta charset="UTF-8">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="application-name" content="Condsis">
    <meta name="theme-color" content="#2c94fd" />
    <meta name="msapplication-TileColor" content="#2c94fd">   
    <title>Condsis</title>
    <link rel="stylesheet" href="./styles.css">
    <link rel="manifest" href="manifest.json"> 
</head>

<body>
    <div>
        <h1>Olá Mundo
            <small>by pwa</small>
        </h1>

    </div>
    <!-- <script src="./pwabuilder-sw-register.js" defer async></script> -->
    <script defer async>
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(reg => {
                    console.log('service worker registrado')
                })
                .catch(function (err) {
                    console.log('erro', err)
                })
        }
    </script>
</body>

</html>
