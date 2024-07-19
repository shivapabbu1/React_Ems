import React from 'react';
import {  Document, Page, Text, View, StyleSheet, PDFDownloadLink,Image } from '@react-pdf/renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { numberToWords } from 'number-to-words';
import logo from "../../assets/Logo.png"

// Define styles for PDF rendering
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
    
  },
  logo: {
    width: 30, // Set the width of the logo
    height: 30, // Set the height of the logo
     // Optional: Add some margin at the bottom
  },

  header: {
    fontSize: 18,
    padding:5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    padding:5,
    justifyContent: 'center', // Center align content horizontally
  },
  infoLabel: {
    width: 120,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
  },
 
  tableContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    border: 1,
    borderColor: '#000',
  },
  subTableContainer: {
    flex: 1,
    border: 1,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
   
    padding: 5,
  },
  tableCell: {
    flex: 1,
   
    textAlign: 'center',
  },
  netPaySection: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10
}
});

// Component to generate the PDF document
const PayslipPDF = ({ paySlip, employee }) => (
 

  <Document>
    <Page size="A4" style={styles.page}>
      {/* Company Header */}
      <View style={styles.section}>
      
      <View style={styles.infoRow}>
      <Image src={logo} style={styles.logo} />
        <Text style={styles.header}>DevDolphins</Text>

      </View>
    
    <Text>5th First Floor, Anishika Towers Mall, KPHB phase 6, Kukatpally, Hyderabad, Telangana - 500085.</Text>
  </View>

      {/* Employee Information */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
  {/* Column 1 */}
  <View style={{ flex: 1, marginRight: 10 }}>
  <Text style={styles.header}>Employee Information:</Text>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Name:</Text>
      <Text style={styles.infoValue}>{`${employee.firstName} ${employee.lastName}`}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Joining Date:</Text>
      <Text style={styles.infoValue}>{employee.dateOfJoining}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Designation:</Text>
      <Text style={styles.infoValue}>{employee.jobRole}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Location:</Text>
      <Text style={styles.infoValue}>Hyderabad</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Effective Work Days:</Text>
      <Text style={styles.infoValue}>31</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>LOP:</Text>
      <Text style={styles.infoValue}>0</Text>
    </View>
  </View>

  {/* Column 2 */}
  <View style={{ flex: 1, marginLeft: 10 }}>
  <Text style={styles.header}>Employee Details:</Text>
    
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Employee No:</Text>
      <Text style={styles.infoValue}>{employee.employeeId}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Bank Name:</Text>
      <Text style={styles.infoValue}>HDFC Bank</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>Bank Account No:</Text>
      <Text style={styles.infoValue}>1234567890</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>PAN Number:</Text>
      <Text style={styles.infoValue}>{employee.pan}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>PF UAN:</Text>
      <Text style={styles.infoValue}>{employee.uanNumber}</Text>
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.header}>Earnings and Deductions</Text>

  {/* Main Table Container */}
  <View style={styles.tableContainer}>

    {/* Earnings Section */}
    <View style={styles.subTableContainer}>
      <Text style={styles.subHeader}>Earnings</Text>

      {/* Earnings Table */}
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>BASIC</Text>
          <Text style={styles.tableCell}>{paySlip.grossSalary}</Text>
        </View>
        {/* Add more earnings rows here if needed */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}></Text>
          <Text style={styles.tableCell}>{/* Another earnings item */}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>TotalAmount</Text>
          <Text style={styles.tableCell}>{paySlip.netSalary}</Text>
        </View>
      </View>
   

    
      <Text style={styles.subHeader}>Deductions</Text>

      {/* Deductions Table */}
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Description</Text>
          <Text style={styles.tableCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>TAX</Text>
          <Text style={styles.tableCell}>{paySlip.taxDeducted}</Text>
        </View>
        {/* Add more deductions rows here if needed */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Other Deductions</Text>
          <Text style={styles.tableCell}>{paySlip.otherDeductions}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>TotalAmount</Text>
          <Text style={styles.tableCell}>{paySlip.totalDeductions}</Text>
        </View>
      </View>
    </View>

  </View>
</View>

{/* Net Pay Section */}
<View style={styles.netPaySection}>
    <Text style={styles.header}>Net Pay for the month: {paySlip.netSalary}</Text>
  </View>

    </Page>
  </Document>
);

const PaySlipDetails = ({ paySlip, employee }) => {
  // Convert net salary to words
  const netPayInWords = numberToWords.toWords(paySlip.netSalary);

  return (
    <div className="container" id="payslip-details">
      {/* Company Header */}
      <div className="row mb-4 d-flex justify-content-between align-items-center text-center">
  <div className="col-md-2">
    <img src={logo} alt="Company Logo" className="img-fluid" />
  </div>
  <div className="col-md-10">
    <h2 className="mb-0">
      DevDolphins{' '}
      <span style={{ display: "block", fontSize: "0.60em" }}>
        Software Pvt Ltd
      </span>
    </h2>
    <div className="mb-0">
      5th First Floor, Anishika Towers Mall, KPHB phase 6, Kukatpally, Hyderabad, Telangana - 500085.
    </div>
  </div>
</div>


      {/* Employee Information */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Employee Information</h5>
          <p><strong>Name:</strong> {`${employee.firstName} ${employee.lastName}`}</p>
          <p><strong>Joining Date:</strong> {employee.dateOfJoining}</p>
          <p><strong>Designation:</strong> {employee.jobRole}</p>
          <p><strong>Location:</strong> Hyderabad</p>
          <p><strong>Effective Work Days:</strong> 31</p>
          <p><strong>LOP:</strong> 0</p>
        </div>
        <div className="col-md-6">
          <h5>Bank and Other Details</h5>
          <p><strong>Employee No:</strong> {employee.employeeId}</p>
          <p><strong>Bank Name:</strong> HDFC Bank</p>
          <p><strong>Bank Account No:</strong> 1234567890</p>
          <p><strong>PAN Number:</strong> {employee.pan}</p>
          <p><strong>PF UAN:</strong> {employee.uanNumber}</p>
        </div>
      </div>

      {/* Earnings and Deductions */}
      <div className="row mb-4">
        <div className="col-md-12">
          <h5>Earnings and Deductions</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center" colSpan="2">Earnings</th>
                <th className="text-center" colSpan="2">Deductions</th>
              </tr>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BASIC</td>
                <td>{paySlip.grossSalary}</td>
                <td>TAX</td>
                <td>{paySlip.taxDeducted}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Other Deductions</td>
                <td>{paySlip.otherDeductions}</td>
              </tr>
              <tr>
                <td><strong>Total Earnings</strong></td>
                <td><strong>{paySlip.netSalary}</strong></td>
                <td><strong>Total Deduction</strong></td>
                <td><strong>{paySlip.totalDeductions}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Net Pay Section */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <p><strong>Net Pay for the month:</strong> {paySlip.netSalary}</p>
          <p>{netPayInWords} only</p>
        </div>
      </div>

      {/* PDF Download Link */}
      <div className="row">
        <div className="col-md-12 text-center">
          <PDFDownloadLink document={<PayslipPDF paySlip={paySlip} employee={employee} />} fileName="payslip.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default PaySlipDetails;