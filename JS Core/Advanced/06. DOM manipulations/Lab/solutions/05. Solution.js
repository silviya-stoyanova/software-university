function attachGradientEvents() {
    document.getElementById('gradient').addEventListener('mousemove', onGradientClick)
    function onGradientClick(e) {
        let width = 300
        let position = e.offsetX
        let gradientPercentage = Math.floor((position ) / width * 100) + '%'
        document.getElementById('result').textContent = gradientPercentage
    }
}
