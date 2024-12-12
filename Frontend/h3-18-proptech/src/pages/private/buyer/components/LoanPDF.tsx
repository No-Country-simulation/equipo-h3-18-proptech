import { DetailedLoanInfo, Quota } from "../BuyerSharesPage";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";
import Logo from "../../../../assets/logo.png";

interface PDFProps {
  detailedLoanInfo: DetailedLoanInfo;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: "20px",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: "20px",
    fontWeight: "semibold",
    textAlign: "center",
  },
  documentDate: {
    fontSize: "12px",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    marginHorizontal: "12px",
  },
  tableHeaderContainer: {
    flexDirection: "row",
    borderBottomColor: "#3D5A80",
    backgroundColor: "#3D5A80",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 32,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    color: "white",
    fontSize: "12px",
  },
  tableHeaderQuotes: {
    width: "15%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableHeaderDate: {
    width: "35%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableHeaderStatus: {
    width: "15%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableHeaderAmount: {
    width: "35%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    fontSize: "12px",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: "black",
    borderRightColor: "black",
    borderBottomColor: "black",
  },
  tableItemQuotes: {
    width: "15%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableItemDate: {
    width: "35%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableItemStatus: {
    width: "15%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
  tableItemAmount: {
    width: "35%",
    height: "100%",
    paddingTop: "8px",
    textAlign: "center",
  },
});

// Create Document Component
export const LoanPDF = ({ detailedLoanInfo }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "12px",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Image src={Logo} style={{ width: 84, height: 80 }}></Image>
          <Text style={styles.title}>Reporte de Préstamo</Text>
        </View>
        <Text style={styles.documentDate}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          marginTop: "10px",
          paddingTop: "10px",
          marginLeft: "12px",
          marginRight: "12px",
          borderTop: "1px solid black",
        }}
      >
        <View
          style={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Nombre y Apellido:</Text>
          <Text
            style={{ fontFamily: "Helvetica" }}
          >{`Abel Montes Vega`}</Text>
        </View>

        <View
          style={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Correo Electrónico:</Text>
          <Text
            style={{ fontFamily: "Helvetica" }}
          >{`abel@backend.com`}</Text>
        </View>

        <View
          style={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Teléfono:</Text>
          <Text style={{ fontFamily: "Helvetica" }}>{`+54123456789`}</Text>
        </View>

        <View
          style={{
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text style={{ fontFamily: "Helvetica-Bold" }}>ID del préstamo:</Text>
          <Text
            style={{ fontFamily: "Helvetica" }}
          >{`${detailedLoanInfo.loanId}`}</Text>
        </View>
      </View>

      <Table items={detailedLoanInfo.quotas} />
    </Page>
  </Document>
);

export default LoanPDF;

const Table = ({ items }: TableItemProps) => {
  return (
    <View style={styles.tableContainer}>
      <TableHeader />
      <TableItem items={items} />
    </View>
  );
};

const TableHeader = () => {
  return (
    <View style={styles.tableHeaderContainer}>
      <Text style={styles.tableHeaderQuotes}>Cuotas</Text>
      <Text style={styles.tableHeaderDate}>Fecha de Expiración</Text>
      <Text style={styles.tableHeaderStatus}>Estado</Text>
      <Text style={styles.tableHeaderAmount}>Monto</Text>
    </View>
  );
};

interface TableItemProps {
  items: Quota[];
}

const TableItem = ({ items }: TableItemProps) => {
  const statuses = {
    0: "Atrasada",
    1: "Pendiente",
    2: "Pagada",
  };
  const tableItems = items.map(
    ({ quotaNumber, expiredDate, stateQuota, amount, quotaId }) => {
      return (
        <View key={quotaId} style={styles.tableItemContainer}>
          <Text style={styles.tableItemQuotes}>{quotaNumber}</Text>
          <Text style={styles.tableItemDate}>
            {expiredDate.toLocaleDateString()}
          </Text>
          <Text style={styles.tableItemStatus}>
            {statuses[stateQuota as 0 | 1 | 2]}
          </Text>
          <Text style={styles.tableItemAmount}>${amount}</Text>
        </View>
      );
    }
  );
  return <>{tableItems}</>;
};
