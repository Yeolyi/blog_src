let cnt = 0;
const timeoutID = setInterval(() => {
    console.log(cnt++);
    if (cnt == 5) { clearInterval(timeoutID) }
}, 1000);
