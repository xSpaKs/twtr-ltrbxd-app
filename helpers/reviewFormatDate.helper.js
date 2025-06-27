export function reviewFormatDate(isoDateString) {
    if (!isoDateString) return "";

    const date = new Date(isoDateString);
    if (isNaN(date)) return "";

    return (
        "on " +
        date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    );
}
