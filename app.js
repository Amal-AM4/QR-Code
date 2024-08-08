document.getElementById('generate').addEventListener('click', function() {
    const url = document.getElementById('url').value;
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    // Clear any existing QR code
    const qrImageContainer = document.getElementById('qr-image');
    qrImageContainer.innerHTML = '';

    // Calculate pixel dimensions for 300 DPI and 10 inches
    const dpi = 300;
    const sizeInches = 10;
    const sizePixels = dpi * sizeInches;

    // Generate QR code
    const qrCode = new QRCode(qrImageContainer, {
        text: url,
        width: sizePixels,
        height: sizePixels,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Wait for a brief moment to ensure QR code is generated
    setTimeout(() => {
        const qrCanvas = qrImageContainer.querySelector('canvas');
        if (qrCanvas) {
            const qrDataUrl = qrCanvas.toDataURL('image/png');
            const qrImage = new Image();
            qrImage.src = qrDataUrl;
            qrImage.width = sizePixels;
            qrImage.height = sizePixels;

            qrImageContainer.innerHTML = '';
            qrImageContainer.appendChild(qrImage);

            // Update download link
            const downloadLink = document.getElementById('download');
            downloadLink.href = qrDataUrl;
        } else {
            alert('Failed to generate QR code. Please try again.');
        }
    }, 500); // Adjust timeout as needed
});
