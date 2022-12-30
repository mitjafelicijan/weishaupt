// Author: mitjafelicijan.com
// License: MIT

// The function takes the following parameters:
// element: The video element.
// spreadSize: The size of the spread.
// spread: The spread.
// animationSpeed: The speed of the animation.
// colorMultiplier: The multiplier of the color.
// lightnessThreshold: The threshold of the lightness.
// alpha: The alpha of the color.

function weishaupt(element = element, spreadSize = 1000, spread = 0, animationSpeed = 3, colorMultiplier = 5, lightnessThreshold = 50, alpha = 0.6) {
    // Check if the variable is a DOM element.
    if (!(element instanceof HTMLElement)) {
        console.error('The variable is not a DOM element.');
        return;
    }

    // Check if the element is a video.
    if (element.tagName !== 'VIDEO') {
        console.error('The element is not a video.');
        return;
    }

    const video = element;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    video.style.transition = `box-shadow ${animationSpeed}s linear`;

    let currentColor = {
        r: null,
        g: null,
        b: null
    };

    const getMostPresentColor = () => {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
        const data = imageData.data;

        // Create an object to store the frequency of each color
        const colorFrequency = {};

        // Iterate over the pixel data and count the frequency of each color
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            const color = `${r},${g},${b}`;

            if (colorFrequency[color]) {
                colorFrequency[color]++;
            } else {
                colorFrequency[color] = 1;
            }
        }

        // Sort the colors by frequency.
        const sortedColors = Object.keys(colorFrequency).sort((a, b) => colorFrequency[b] - colorFrequency[a]);

        // Select the most frequent colors as the palette.
        const palette = sortedColors.slice(0, 5);

        // Calculate the average color of the palette.
        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < palette.length; i++) {
            const color = palette[i].split(',');
            r += parseInt(color[0]);
            g += parseInt(color[1]);
            b += parseInt(color[2]);
        }

        r = Math.round(r / palette.length) * colorMultiplier;
        g = Math.round(g / palette.length) * colorMultiplier;
        b = Math.round(b / palette.length) * colorMultiplier;

        if (!currentColor || currentColor.r !== r || currentColor.g !== g || currentColor.b !== b) {
            // Calculate the lightness of the color.
            const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
            if (lightness > lightnessThreshold) {
                currentColor = { r, g, b };
            }
        }

        // Return the last appropriate color.
        return { r: currentColor.r, g: currentColor.g, b: currentColor.b };
    };

    setInterval(() => {
        const mostPresentColor = getMostPresentColor();
        const rgba = `0 0 ${spreadSize}px ${spread}px rgba(${mostPresentColor.r}, ${mostPresentColor.g}, ${mostPresentColor.b}, ${alpha})`;
        video.style.boxShadow = rgba;
    }, 1000);
}
