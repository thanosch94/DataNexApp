import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DocumentDto } from '../../../dto/document.dto';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css',
})
export class PdfGeneratorComponent {
  docDefinition:any

  constructor(){
    (window as any).pdfMake.vfs = pdfFonts.vfs;

  }
  getBase64ImageFromUrl(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg'); // Or 'image/png'
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }

  generate(document: DocumentDto) {
    let that = this
    this.getBase64ImageFromUrl(
      'http://localhost:4200/assets/images/datanex_logo.png'
    )
      .then((logo) => {

        that.docDefinition = {
          content: [
            {
              image: logo,
              width: 100,
              style: 'logo',
              absolutePosition: { y: 10 }
            },

            {
              text: 'Doc. Code:',
              style: 'docCodeTitle',
              absolutePosition: { x: 20, y: 50 }
            },
            {
              text: document.DocumentCode,
              style: 'docCode',
              absolutePosition: { x: 80, y: 50 }
            },
            {
              text: 'Customer:',
              style: 'boldText',
              absolutePosition: { x: 20, y: 65 }

            },
            {
              text: document.CustomerName,
              style: 'normalText',
              absolutePosition: { x: 80, y: 65 }
            },
            {
              text: 'Issue Date:',
              style: 'boldText',
              absolutePosition: { x: 20, y: 80 }

            },
            {
              text: document.DocumentDateTime,
              style: 'normalText',
              absolutePosition: { x: 80, y: 80 }
            },
            {
              text: 'Address',
              style: 'boldText',
              absolutePosition: { x: 300, y: 50 }

            },
            {
              text: document.ShippingAddress,
              style: 'normalText',
              absolutePosition: { x: 380, y: 50 }
            },

            {
              // Wrap the table in an array with a container for alignment
              stack: [
                {
                  table: {
                    headerRows: 1,
                    body: [
                      ['S/N','Sku', 'Name', 'Qty', 'Price', 'Total Price'],
                      ['1','RUE-7635', 'T-shirt Black Tommy Hilfiger', '3', '2', '6'],
                      ['2','TFR-982', 'Jeans Black W34/L32', '1', '4.6', '4.6'],
                      ['3','EYW-1491', 'Hoodie Calvin Klein', '2', '7', '14'],
                    ]
                  },
                  layout: 'lightHorizontalLines', // Optional: Add table styling

                },

              ],
              style:'tableStyle', // This centers the table within the page

            }
          ],

          styles: {
            logo: {
              alignment: 'center',

            },
            boldText: {
              fontSize: 12,
              bold: true,
              alignment: 'left'
            },
            docCodeTitle: {
              fontSize: 12,
              bold: true,
              alignment: 'left',
            },
            docCode: {
              fontSize: 12,
              bold: true,
              alignment: 'left',
            },
            normalText: {
              fontSize: 12,
              alignment: 'left'
            },
            tableStyle: {
              alignment: 'center',
              margin: [60, 100, 20, 10],


            },
            tableHeader: {
              bold: true,
              fontSize: 12,
              alignment: 'center',
              fillColor: '#f2f2f2'
            }
          },


        };

        pdfMake.createPdf(that.docDefinition).download('table.pdf');
      })
      .catch((error) => {
        console.error('Error loading image:', error);
      });
  }
}
