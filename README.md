# NPV Calculator

NPV Calculator will accept an initial value, cash flows, lower and upper bound discount rates, and discount rate increments. NPV will be calculated per discount rate. Formula is based from https://www.investopedia.com/terms/n/npv.asp.

### Input Formats
* Cash Flows - Comma-separated numbers (e.g. 1000,2000,3000)
* Discount Rates (Lower Bound, Upper Bound, Increment) - In percent (e.g. 100 instead of 1)

### Tech Stack
* JavaScript
* HTML/CSS
* Google Firebase (for real-time database)
* Google Charts
* Bootstrap

### Unit Tests
There are unit tests for the basic core NPV functionalities at https://github.com/jpcamba/NPV-Calculator/tree/master/tests. The packages jasmine-core, karma, and karma-jasmine need to be separately installed. To kick-off the tests, navigate to `node_modules/.bin` and run the command `karma start ../../karma.conf.js`.

Website is deployed at https://jpcamba.github.io/NPV-Calculator/.
