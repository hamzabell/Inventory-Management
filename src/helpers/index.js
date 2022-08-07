

export const compose = (...func) => x => func.reduceRight(
    (y, f) => f(y), x
);


export const debounce = (fnc, timeout=800) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => fnc.apply(this, args), timeout)
    }
}