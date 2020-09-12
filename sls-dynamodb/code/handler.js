const setupDb = require("./src/db")

const db = setupDb({
    table: "my-table",
    region: "us-east-1",
})

module.exports.hello = async (event) => {
    await db.create({
        PK: "something",
        SK: "note_@id",
        comment: "Hello",
    })

    return {
        statusCode: 200,
        body: JSON.stringify({
            input: event,
        }),
    }
}
