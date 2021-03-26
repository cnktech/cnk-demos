const AWS = require('aws-sdk')
var eventbridge = new AWS.EventBridge()

const emit = async ({
    source,
    event,
    data,
    eventBus = process.env.EVENTBUS
}) => {
    const params = {
        Entries: [
            {
                EventBusName: eventBus,
                Source: 'custom.' + source,
                DetailType: event,
                Time: new Date(),
                Detail: JSON.stringify(data)
            }
        ]
    }

    return await eventbridge.putEvents(params).promise()
}

module.exports.first = async () => {
    await emit({
        source: 'eventBridgeDemoService',
        event: 'firstFunctionHappened',
        data: {
            forceError: true,
            immiediateError: true
        }
    })
    return 'first'
}

module.exports.second = async (e) => {
    /**
     * Deal with error right away example
     */
    if (e.detail.immiediateError) {
        console.log('deal with this another way')
        return
    }

    /**
     * Throw error so functoin can retry a mac of 185 times for 24 hrs
     */
    if (e.detail.forceError) {
        throw new Error('FORCED ERROR')
    }

    /**
     * Example of everything workking well
     */
    console.log('EVENT INPUT: ', e.detail)
    return e.detail
}
