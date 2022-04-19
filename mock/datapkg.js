datapkg: any = [
    {
        id: 1,
        name: 'test',
        datas: [
            {
                id: 1,
                name: 'test2'
            }
        ]
    },
    {
        id: 2,
        name: 'test2',
        datas: [
            {
                id: 2,
                name: 'test22'
            }
        ]
    }
]

const Mock = require('mockjs')

module.exports = function(app) {
    app.get('/api/datapkg', function(req, res) {
        const mock = Mock.mock({
            data: {
                datapkg
            },
            code: 0,
            message: 'success'
        })

        res.json(mock)
    })
}
