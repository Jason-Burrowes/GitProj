const readline = require('readline');

function createArray(size) {
    return new Array(size);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
}

async function main() {
    const numbers = createArray(6);
    const names = createArray(6);

    for (let i = 0; i < 6; i++) {
        console.log("Enter a number:");
        numbers[i] = Number(await prompt(`Enter a value for numbers[${i}]: `));
        console.log("Enter a name:");
        names[i] = await prompt(`Enter a value for names[${i}]: `);
    }

    console.log("\n📋 Output:");
    for (let i = 0; i < 6; i++) {
        console.log(`Number: ${numbers[i]}, Name: ${names[i]}`);
    }

    rl.close();
}

main();
