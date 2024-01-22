import QRCode from 'qrcode';

const CreatedTest = (props) => {
    const {codeInfo} = props

    // Генерация QR-кода с использованием текстовых данных
    const generateQRCode = (uniqueCode) => {
        const url = 'http://localhost:3000/quiz/' + uniqueCode;
        QRCode.toDataURL(url, (err, imageUrl) => {
          if (err) {
            console.error(err);
            return;
          }
          displayQRCode(imageUrl);
        });
      };
      
      const displayQRCode = (imageUrl) => {
        // Assuming you have an image element with id "qrCodeImage" in your HTML
        const qrCodeImage = document.getElementById('qrCodeImage');
        qrCodeImage.src = imageUrl;
      };

    generateQRCode(codeInfo.unique_code);

    return (
        <div>
            <h3>Введите в поиск или отсканируйте QR code:</h3>
            <span>Код вашего теста: {codeInfo.unique_code}</span>
            <div>
                <div></div>
            </div>
        </div>
    )
}
export default CreatedTest;