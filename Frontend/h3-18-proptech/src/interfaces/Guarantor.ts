export interface Guarantor {
  name: string;
  lastname: string;
  CUIT: string;
  DNI: string;
  email: string;
  phoneNumber: string;
  Photo: File;
  Front: File;
  Back: File;
  salaryReceipt1: File;
  salaryReceipt2: File;
  salaryReceipt3: File;
  homeReceipt: File;
}
