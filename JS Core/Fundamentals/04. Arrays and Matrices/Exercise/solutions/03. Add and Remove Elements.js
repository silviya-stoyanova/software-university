function solve(commands) {
    let output = []

    for (let i = 0; i < commands.length; i++) {
        commands[i] === 'add' ? output.push(i + 1) : output.pop()
    }

    console.log(output.length > 0 ? `${output.join('\n')}` : 'Empty')
}
solve(['add',
    'add',
    'add',
    'add']
)