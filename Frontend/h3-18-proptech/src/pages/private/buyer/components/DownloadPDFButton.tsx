import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import LoanPDF from "./LoanPDF";
import { getMyLoanDetails } from "../../../../services/buyer";
import { Quota } from "../BuyerSharesPage";
import { Loader } from "../../../../components/common";
import { PdfIconSmall } from "../../../../components/icons";
import { useState } from "react";

interface Props {
  loanId: string;
  classname?: string;
}

export function DownloadPDFButton({ loanId, classname }: Props) {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    const response = await getMyLoanDetails(loanId, "", 1);
    response?.data.quotas.forEach((el: Quota) => {
      el.expiredDate = new Date(el.expiredDate);
    });
    const blob = await pdf(
      <LoanPDF detailedLoanInfo={response?.data} />
    ).toBlob();
    saveAs(blob, `${loanId}.pdf`);
    setLoading(false);
  };

  return (
    <div
      className={`p-3 rounded-full ${classname} transition-all`}
      onClick={() => handleDownload()}
    >
      {loading ? <Loader size="button" borderColor="primary-blue" border="normal" classname="mx-0" /> : <PdfIconSmall className={`w-8 h-8`} />}
    </div>
  );
}

export default DownloadPDFButton;
