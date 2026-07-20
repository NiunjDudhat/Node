const { Server } = require("socket.io");


const socketIo = () => {
    try {
        const io = new Server({
            cors:'http://localhost:5173'
        })

        io.on('connection', (socket) => {
            console.log("socket", socket.id);

            socket.on('send_msg', ({id, message}) => {                
                io.to(id).emit('r_msg', message)
            })

            socket.on('group_name', ({groupName}) => {
                socket.join(groupName);
            })


        });

        io.listen(4000);
    } catch (error) {
        console.log(error);
    }
}

module.exports = socketIo;