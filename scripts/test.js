function task () {
    return new Promise(function(resolve, reject){
        reject();
    })
}

task().then(function() {
    console.log ('Success 1');
}).then(function() {
    console.log ('Success 2');
}).then(function() {
    console.log ('Success 3');
}).then(function() {
    console.log ('Error 1');
}).then(function() {
    console.log ('Success 4');
})