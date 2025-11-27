// L2 - Countdown with setInterval and early stop on "s" (Node)

const readline = require("readline");

// Setup stdin to read keys instantly
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter number of seconds to count down: ", (answer) => {
    let seconds = Number(answer);

    if (!Number.isFinite(seconds) || seconds <= 0) {
        console.log("Please enter a positive number.");
        rl.close();
        process.exit(0);
    }

    console.log(`Starting countdown from ${seconds} seconds... (press "s" to stop)`);

    let stopped = false;

    const intervalId = setInterval(() => {
        if (stopped) {
            clearInterval(intervalId);
            console.log("Countdown stopped by user.");
            rl.close();
            process.exit(0);
        }

        console.log(`Remaining: ${seconds} second(s)`);
        seconds--;

        if (seconds < 0) {
            clearInterval(intervalId);
            console.log("Countdown Complete!");
            rl.close();
            process.exit(0);
        }
    }, 1000);

    // Listen for "s" key to stop
    process.stdin.on("keypress", (str, key) => {
        if (key.sequence && key.sequence.toLowerCase() === "s") {
            stopped = true;
        }
        // Optional: allow Ctrl+C to exit
        if (key.ctrl && key.name === "c") {
            clearInterval(intervalId);
            console.log("\nExited.");
            rl.close();
            process.exit(0);
        }
    });

    // Demonstrate setTimeout alongside setInterval (optional tip after 2s)
    setTimeout(() => {
        if (!stopped && seconds > 0) {
            console.log('Tip: Press "s" to stop the countdown early.');
        }
    }, 2000);
});