const uuid = require('./uuid')
const AWS = require('aws-sdk')

// formatCreateId allows someone to put @id, which will
// automatically replace it with the result of uuid/v4
const formatCreateItem = oldInput => {
    const input = { ...oldInput }// make a copy
    if (input.pk && input.pk !== '@id' && input.pk.includes('@id')) {
        input.pk = input.pk.replace('@id', uuid())
    }

    if (input.pk && input.pk === '@id') {
        input.pk = uuid()
    }

    if (input.sk && input.sk !== '@id' && input.sk.includes('@id')) {
        input.sk = input.sk.replace('@id', uuid())
    }

    if (input.sk && input.sk === '@id') {
        input.sk = uuid()
    }

    return input
}

/**
 * In a Lambda context, it is nice to initialize this function
 * outside of a handler function, so it stays cached on the next
 * execution.
 * 
 */
module.exports = ({ table, region}) => {
    const db = new AWS.DynamoDB.DocumentClient({
        region: region
    })


    const get = (input) => {
        const item = await db.get({
            TableName: table,
            Key: {
                pk: input.pk,
                sk: input.sk,
            }
        }).promise()

        return item.Item
    }

    // TODO: create condition when using unique id
    // to only write if there is no existing item with same id
    const create = (input) => {
        if (!input.PK && !input.GSI1 && !input.GSI2) {
            throw new Error('create must have either PK, GSI1, or GSI2 defined')
        }

        if (!input.SK) {
            throw new Error('create must have a SK defined')
        }

        const formattedInput = formatCreateItem(input)

        await db.put({
            TableName: table,
            Item: formattedInput
        }).promise()

        return formattedInput
    }

    const put = (input) => {
        if (!input.PK && !input.GSI1 && !input.GSI2) {
            throw new Error('create must have either PK, GSI1, or GSI2 defined')
        }

        if (!input.SK) {
            throw new Error('create must have a SK defined')
        }


        await db.put({
            TableName: table,
            Item: input
        }).promise()

        return input
    }

    const query = (input) => {
        const params = {
            TableName: table,
            KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
            ExpressionAttributeValues: {
                ':pk': input.pk,
                ':sk': input.sk
            }
        }

        const result = await db.query(params).promise()
        return result.Items || []
    }

    const remove = () => {
        await db.delete({
            TableName: table,
            Key: {
                pk: newInput.pk,
                sk: newInput.sk,
            }
        }).promise()

        return newInput
    }

    return {
        get,
        create,
        put,
        query,
        remove
    }
}