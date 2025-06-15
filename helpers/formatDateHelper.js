const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.max(0, now - date);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
        return `il y a ${seconds}s`;
    }

    if (minutes < 60) {
        return `il y a ${minutes}m`;
    }

    if (hours < 24) {
        return `il y a ${hours}h`;
    }

    if (days < 7) {
        return `il y a ${days} jour${days > 1 ? "s" : ""}`;
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hour}h${minute}`;
};

export default formatDate;
