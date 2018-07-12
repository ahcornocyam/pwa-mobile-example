if ('serviceWorker' in navigator) {
    navigator.serviceWorker
            .register("/js/service-worker.js")
            .then(function (reg) {                                
                console.log(reg)
            })
            .catch(function (err) {    
                console.log(err)            
            });
} else {
    console.log('não suportado')
}