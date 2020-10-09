const YAML = require("yaml")
const fs = require("fs")

const writeFile = (x) => {
    fs.writeFile(process.cwd() + "/dashboard.yml", x, function (err) {
        if (err) return console.log(err)
        console.log("Generated!")
    })
}

const makeBody = (config) => `'{
   "start": "-PT6H",
   "periodOverride": "inherit",
   "widgets": [
      {
         "type":"metric",
         "x":${config.x},
         "y":${config.y},
         "width":${config.width},
         "height":${config.height},
         "properties": ${JSON.stringify(config.sourceFromDashboard)}
   }]
}'`

const makeDashboard = (name, body) => ({
    Type: "AWS::CloudWatch::Dashboard",
    Properties: {
        DashboardBody: makeBody(body),
        DashboardName: name,
    },
})

const dash = makeDashboard("exampledash", {
    x: 0,
    y: 0,
    width: 24,
    height: 6,
    functionName: "syntheticuser-dev-hello",
    region: "us-east-2",
    sourceFromDashboard: {
        metrics: [["AWS/Lambda", "Errors", "FunctionName", "code-dev-hello"]],
        view: "timeSeries",
        stacked: false,
        region: "us-east-1",
        stat: "Average",
        period: 3600,
    },
})

const result = YAML.stringify(dash)

writeFile(result)
