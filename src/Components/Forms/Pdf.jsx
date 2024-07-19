import React from 'react';
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
    width: "100%",
    height: "100%",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  label: {
    fontSize: 12,
    width: "100%",
    paddingBottom: 5,
  },
  inputField: {
    fontSize: 14,
    width: "100%",
    height: 20,
    padding: 5,
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: 5,
  },
  textarea: {
    fontSize: 14,
    width: "100%",
    height: 60,
    padding: 5,
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: 5,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  column: {
    flexDirection: "column",
    width: "50%",
    padding: 5,
  },
  main: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  columnCheckbox: {
    flex: 1,
    marginRight: 20,
  },
  columnTextarea: {
    flex: 2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    fontSize: 20,
  },
});

// Define the PDF component
const Pdf = ({ formData }) => {
  // Create the PDF document
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.main}>ItyNerds Employee Registration Form</Text>
        <View style={styles.section}>
          <Text style={styles.heading}>Personal Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>First Name:</Text>
              <Text style={styles.inputField}>{formData.firstName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Middle Name:</Text>
              <Text style={styles.inputField}>{formData.middleName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.inputField}>{formData.lastName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Date of Birth:</Text>
              <Text style={styles.inputField}>{formData.dob}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Gender:</Text>
              <Text style={styles.inputField}>{formData.gender}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Blood Group:</Text>
              <Text style={styles.inputField}>{formData.bloodGroup}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.inputField}>{formData.mobile}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.inputField}>{formData.email}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Father's Name:</Text>
              <Text style={styles.inputField}>{formData.fatherName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Mother's Name:</Text>
              <Text style={styles.inputField}>{formData.motherName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Marital Status:</Text>
              <Text style={styles.inputField}>{formData.maritalStatus}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Spouse's Name:</Text>
              <Text style={styles.inputField}>{formData.spouseName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.columnCheckbox}>
              <View style={styles.checkboxRow}>
                <Text style={styles.label}>PAN Submitted:</Text>
                <Text style={styles.checkbox}>
                  {formData.hasPanCard ? "☑" : "☐"}
                </Text>
              </View>
              <View style={styles.checkboxRow}>
                <Text style={styles.label}>AADHAR Submitted:</Text>
                <Text style={styles.checkbox}>
                  {formData.hasAadharCard ? "☑" : "☐"}
                </Text>
              </View>
            </View>
            <View style={styles.columnTextarea}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.textarea}>{formData.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Educational Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Qualification:</Text>
              <Text style={styles.inputField}>{formData.qualification}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Department:</Text>
              <Text style={styles.inputField}>{formData.department}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>College Name:</Text>
              <Text style={styles.inputField}>{formData.collegeName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>University Name:</Text>
              <Text style={styles.inputField}>{formData.universityName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>CGPA:</Text>
              <Text style={styles.inputField}>{formData.cgpa}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Year Of Passing:</Text>
              <Text style={styles.inputField}>{formData.yearOfPassing}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Technical Skills:</Text>
              <Text style={styles.inputField}>{formData.technicalSkills}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Certifications:</Text>
              <Text style={styles.inputField}>{formData.certifications}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Experience Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.inputField}>{formData.companyName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Designation:</Text>
              <Text style={styles.inputField}>{formData.designation}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Date Of Leaving:</Text>
              <Text style={styles.inputField}>{formData.dateOfLeaving}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Experience in Years:</Text>
              <Text style={styles.inputField}>{formData.experienceInYears}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Emergency Details</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Contact Name:</Text>
              <Text style={styles.inputField}>{formData.emergencyContactName}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Relationship:</Text>
              <Text style={styles.inputField}>{formData.emergencyRelationship}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Mobile Number:</Text>
              <Text style={styles.inputField}>{formData.emergencyMobile}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Alternate Mobile:</Text>
              <Text style={styles.inputField}>{formData.emergencyAlternateMobile}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink document={MyDocument} fileName="employee_form.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Generating PDF..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default Pdf;
