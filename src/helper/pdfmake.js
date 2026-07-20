const pdfmake = require('pdfmake');
const path = require('path')

pdfmake.addFonts({
    Roboto: {
        normal: path.join(__dirname, '..', '../public/fonts/Roboto/Roboto_Condensed-Regular.ttf'),
        bold: path.join(__dirname, '..', '../public/fonts/Roboto/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '..', '../public/fonts/Roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '..', '../public/fonts/Roboto/Roboto-MediumItalic.ttf')
    }
});


const createPDF = (docDefinition, name) => {
    try {
        const pdf = pdfmake.createPdf(docDefinition);
        pdf.write(`public/pdfs/${name}`).then(() => {
            console.log("pdf create");
        }, err => {
            console.error(err);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = createPDF