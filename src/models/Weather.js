class Weather {
    constructor(temperature, location, condition) {
        this.temperature = temperature;
        this.location = location;
        this.condition = condition;
    }

    get temperature() {
        return this.temperature;
    }
    get location() {
        return this.location;
    }
    get condition() {
        return this.condition;
    }
}

module.exports = Weather;