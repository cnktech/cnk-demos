/** 
const error = {
    l: "LEVEL",
    m: "MEMBER ID",
    i: "INPUT IN JSON",
    s: "LOCATION IN CODE",
    e: "ERROR MESSAGE",
    c: "CORRELATION ID",
}

const errorExample = {
    l: "error",
    m: "member_1235",
    i: {},
    s: "location",
    e: "error",
    c: "123123-1123",
}

const info = {
    l: "LEVEL",
    m: "METRIC",
    v: "VALUE",
    c: "CORRELATION ID",
}

const infoExample = {
    l: "info",
    m: "surveysSent",
    v: "300",
    c: "234-2345-2345",
}
*/

module.exports = {
    error: (x) => {
        console.log(
            JSON.stringify({
                l: "error",
                m: x.memberId || "-",
                i: JSON.stringify(x.input),
                s: x.location,
                e: x.errorMessage,
                c: x.correlationId || "-",
            })
        )
    },
    info: (x) => {
        console.log(
            JSON.stringify({
                l: "info",
                m: x.metric,
                v: x.value,
                c: x.correlationId || "-",
            })
        )
    },
}
