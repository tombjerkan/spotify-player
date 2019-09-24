export default function convertMillisecondsToString(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutePart = Math.floor(totalSeconds / 60);
    const secondPart = totalSeconds % 60;

    return `${minutePart}:${secondPart.toString().padStart(2, "0")}`;
}
