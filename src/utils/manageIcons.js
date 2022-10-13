const sunny_group = ["Sunny", "Mostly Sunny"];
const mostly_cloudy_group = ["Cloudy", "Mostly Cloudy"];
const clear_night_group = ["Clear Night", "Mostly Clear Night"];

const manageIcon = (icon) => {
    try {
        if (sunny_group.includes(icon)) {
            return "Mostly Sunny.svg";
        } else if (mostly_cloudy_group.includes(icon)) {
            return "Mostly Cloudy.svg";
        } else if (clear_night_group.includes(icon)) {
            return "Mostly Clear Night.svg";
        } else {
            return `${icon}.svg`;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const returnIcon = (iconName) => {
    try {
        const domain = 'https://api-catanuvem.vercel.app';
        const src = `${domain}/icons/${encodeURI(manageIcon(iconName))}`;
        return { name: iconName, src };
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = { returnIcon };