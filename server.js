/**
 * Created by Iaroslav Zhbankov on 14.12.2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dateFormat = require('date-format');
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/:time', function (req, res) {
    var unixtime;
    var naturaltime;

    if (req.params.time.match(/^\d{10}$/)) {
        unixtime = req.params.time;
        naturalformat = dateFormat.asString('MM dd, yyyy', new Date(Number(unixtime * 1000)));
        naturaltime = naturalformat.replace(/^\d{2}/, month[Number(naturalformat.slice(0, 2)) - 1]);
        res.send({
            "unixtime": unixtime,
            "natural": naturaltime
        });
    } else if (Date.parse(req.params.time)) {
        naturaltime = req.params.time;
        var monthNumber;
        unixtime = Date.parse(dateDetermination(naturaltime));
        function dateDetermination(time) {
            var year = time.match(/\d{4}$/);
            var day = (time.match(/\s\d{2},/) || time.match(/\s\d{1},/)).toString().slice(1, 3);
            month.map(function (el, index) {
                if (time.match(el)) {
                    monthNumber = index + 1;
                }
            });
            return (year + '-' + monthNumber + '-' + day);
        }

        res.send({
            "unixtime": unixtime,
            "natural": naturaltime
        });
    } else {
        res.send({
            "unixtime": null,
            "natural": null
        });
    }
});

app.listen(8080 || process.env.PORT, function () {
    console.log('Example app listening on port 8080!')
});
