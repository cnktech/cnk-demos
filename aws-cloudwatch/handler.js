const see = require("./src/logger/index")

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

const isError = () => {
    const x = getRandomInt(0, 10)
    return x > 5
}

module.exports.hello = async () => {
    see.info({
        metric: "caller",
        value: "member_12345",
    })

    if (isError()) {
        see.error({
            errorMessage: "This is an error",
            memberId: "member_12345",
            location: "main Function",
            input: {
                data: "1234",
                somethingElse: "4500",
            },
        })
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "hi",
        }),
    }
}
