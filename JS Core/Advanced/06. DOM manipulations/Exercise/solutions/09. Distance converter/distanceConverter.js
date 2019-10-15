function attachEventsListeners() {
    $('#convert').on('click', convert)

    function convert() {
        // convert the input number to meters and then to the output unit
        let number = $('#inputDistance').val()
        let inputUnit = $('#inputUnits option:selected').val()
        let outputUnit = $('#outputUnits option:selected').val()

        if (inputUnit === 'km') {
            number *= 1000
        } else if (inputUnit === "m") {
            number *= 1
        } else if (inputUnit === "cm") {
            number *= 0.01
        } else if (inputUnit === "mm") {
            number *= 0.001
        } else if (inputUnit === "mi") {
            number *= 1609.34
        } else if (inputUnit === "yrd") {
            number *= 0.9144
        } else if (inputUnit === "ft") {
            number *= 0.3048
        } else if (inputUnit === "in") {
            number *= 0.0254
        }

        if (outputUnit === 'km') {
            number /= 1000
        } else if (outputUnit === "m") {
            number /= 1
        } else if (outputUnit === "cm") {
            number /= 0.01
        } else if (outputUnit === "mm") {
            number /= 0.001
        } else if (outputUnit === "mi") {
            number /= 1609.34
        } else if (outputUnit === "yrd") {
            number /= 0.9144
        } else if (outputUnit === "ft") {
            number /= 0.3048
        } else if (outputUnit === "in") {
            number /= 0.0254
        }

        $('#outputDistance').val(number)
    }
}