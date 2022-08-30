const countdown = (value, fn, delay = 1000) => {
    fn(value);
    return value > 0 ? setTimeout(() => countdown(value - 1, fn, delay), delay) : value;
}

countdown(10, console.log);
