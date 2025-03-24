const lambda = {
    handler: './dist/src/infrastructure/functions/get-appointments/handler.handler',
    events: [
        {
            http: {
                path: '/appointments',
                method: 'get',
                cors: true,
                request: {
                    parameters: {
                        querystrings: {
                            insuredId: true
                        }
                    }
                }
            }
        }
    ]
};

export default lambda;
