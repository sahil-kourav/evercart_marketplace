const server = require('../cart_service/src/app')

const port = process.env.PORT || 3002;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})