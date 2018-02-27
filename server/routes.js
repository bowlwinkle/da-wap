const registerStates = (app) => {
    app.get('/states', function (req, res) {
        res.send('Running...')
    });
};

const registerOperations = (app) => {
    app.get('/status', function (req, res) {
        res.send('Running...')
    });
};

module.exports = {
    registerStates,
    registerOperations
};