import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import LoanPDF from "./LoanPDF";
import { Quota } from "../BuyerSharesPage";
import { Loader } from "../../../../components/common";
import { PdfIconSmall } from "../../../../components/icons";
import { useState } from "react";
import { getMyLoanDetailsAtPDF } from "../../../../services";

interface Props {
  loanId: string;
  classname?: string;
}

export interface PDFQuota {
  quotaId: string;
  quotaNumber: string;
  expirationDate: Date;
  stateQuota: number;
  amount: number;
  preferenceID: string;
}

export function DownloadPDFButton({ loanId, classname }: Props) {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    const response = await getMyLoanDetailsAtPDF(loanId);
    if (response && response.data) {
      response.data.quotas.forEach((el: PDFQuota) => {
        el.expirationDate = el.expirationDate
          ? new Date(el.expirationDate)
          : el.expirationDate;
          
      });
      const pagedQuotas = Object.groupBy(response.data.quotas as Quota[], (_item, index) =>
        Math.ceil((index + 1) / 18)
      );
      const blob = await pdf(
        <LoanPDF detailedLoanInfo={response.data} pagedQuotas={pagedQuotas} />
      ).toBlob();
      saveAs(blob, `${response.data.name}_${response.data.lastName}.pdf`);
    }

    setLoading(false);
  };

  return (
    <div
      className={`p-3 rounded-full ${classname} transition-all`}
      onClick={() => handleDownload()}
    >
      {loading ? (
        <Loader
          size="button"
          borderColor="primary-blue"
          border="normal"
          classname="mx-0"
        />
      ) : (
        <PdfIconSmall className={`w-8 h-8`} />
      )}
    </div>
  );
}

export default DownloadPDFButton;
