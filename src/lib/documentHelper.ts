function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
/**
 * Effettua il download di un file
 * @param data
 * @param filename
 
 */
function downloadFile(data: Blob, filename: string) {
    

    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });
}

export { b64toBlob, downloadFile };
