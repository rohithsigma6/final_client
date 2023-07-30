import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const ProductDetailsPopup = ({ open, onClose, product }) => {
  const generatePDF = (product) => {

    const styles = StyleSheet.create({
      page: {
        padding: 20,
      },
      title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: "bold",
      },
      content: {
        fontSize: 14,
        marginBottom: 8,
      },
    });

    const MyDocument = (
      <Document>
        <Page style={styles.page}>
          <View>
            <Text style={styles.title}>Product Details</Text>
           
            <Text style={styles.content}><strong>Brand:</strong> {product.brand}</Text>
           
          </View>
        </Page>
      </Document>
    );

    return MyDocument;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <PDFViewer width="100%" height="500px">
        
          {product && generatePDF(product)}
        </PDFViewer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => {
          
            const pdfBlob = generatePDF(product).toBlob();
            const fileName = `${product.productName}.pdf`;
            pdfBlob.then((blob) => {
              saveAs(blob, fileName);
            });
          }}
          color="primary"
        >
          Download as PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsPopup;
