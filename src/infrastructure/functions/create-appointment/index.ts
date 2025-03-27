const lambda = {
    handler: './dist/src/infrastructure/functions/create-appointment/handler.handler',
    events: [
        {
            http: {
                path: '/appointments',
                method: 'post',
                cors: true
            }
        }
    ],
};

export default lambda;
