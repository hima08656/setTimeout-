// L2 - Building a Countdown Timer with Both setTimeout and setInterval (Browser)

// 1) Ask the user for seconds
let input = prompt("Enter number of seconds to count down:");
let seconds = Number(input);

// Validate input
if (!Number.isFinite(seconds) || seconds <= 0) {
    console.log("Please enter a positive number.");
} else {
    console.log(`Starting countdown from ${seconds} seconds...`);

    // Flag to indicate manual stop
    let stopped = false;

    // 2) Show remaining time every second
    const intervalId = setInterval(() => {
        if (stopped) {
            clearInterval(intervalId);
            console.log("Countdown stopped by user.");
            return;
        }

        console.log(`Remaining: ${seconds} second(s)`);
        seconds--;

        // 3) When countdown reaches zero, stop the timer and print complete
        if (seconds < 0) {
            clearInterval(intervalId);
            console.log("Countdown Complete!");
        }
    }, 1000);

    // Detect "s" key to stop immediately (uses event listener)
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "s") {
            stopped = true;
        }
    });

    // Optional: setTimeout check (demonstrate delayed action)
    // This is a simple delayed check that logs a tip after 2 seconds.
    // It shows setTimeout being used alongside setInterval.
    setTimeout(() => {
        if (!stopped && seconds > 0) {
            console.log('Tip: Press "s" to stop the countdown early.');
        }
    }, 2000);
}