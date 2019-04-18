export function getUpdateStatus(prevStatus, nextStatus) {

    const stateArr = [
        ["0", "1", 0],
        ["0", "2", 1],
        ["2", "0", -1],
        ["1", "0", 0],
        ["1", "2", 1],
        ["2", "1", -1],
    ];

    let state = 0;

    stateArr.forEach(item => {
        if (item[0] === String(prevStatus) && item[1] === String(nextStatus)) state = item[2];
    });

    return state;
}
