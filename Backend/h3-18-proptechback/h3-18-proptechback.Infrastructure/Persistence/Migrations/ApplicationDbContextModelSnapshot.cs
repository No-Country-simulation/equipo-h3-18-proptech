﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using h3_18_proptechback.Infrastructure.Persistence;

#nullable disable

namespace h3_18_proptechback.Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("h3_18_proptechback.Domain.DataGuarantor", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CUIT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DNI")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("LoanRequestId")
                        .HasColumnType("uuid");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("LoanRequestId");

                    b.ToTable("DataGuarantors");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.DataUser", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CUIT")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DNI")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("StateValidation")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.ToTable("DataUsers");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.DocumentsGuarantor", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BackDNIURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DataGuarantorID")
                        .HasColumnType("uuid");

                    b.Property<string>("FrontDNIURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PhotoURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProofAddressURL")
                        .HasColumnType("text");

                    b.Property<string>("Salary2URL")
                        .HasColumnType("text");

                    b.Property<string>("Salary3URL")
                        .HasColumnType("text");

                    b.Property<string>("SalaryURL")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("DataGuarantorID");

                    b.ToTable("DocumentsGuarantors");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.DocumentsUser", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BackDNIURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DataUserID")
                        .HasColumnType("uuid");

                    b.Property<string>("FrontDNIURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("LoanRequestId")
                        .HasColumnType("uuid");

                    b.Property<string>("PhotoURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProofAddressURL")
                        .HasColumnType("text");

                    b.Property<string>("Salary2URL")
                        .HasColumnType("text");

                    b.Property<string>("Salary3URL")
                        .HasColumnType("text");

                    b.Property<string>("SalaryURL")
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("DataUserID");

                    b.HasIndex("LoanRequestId");

                    b.ToTable("DocumentsUsers");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.Loan", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("FinancingAmount")
                        .HasColumnType("numeric");

                    b.Property<decimal>("InterestRate")
                        .HasColumnType("numeric");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("LoanRequestId")
                        .HasColumnType("uuid");

                    b.Property<decimal>("PaymentMonth")
                        .HasColumnType("numeric");

                    b.Property<int>("StateLoan")
                        .HasColumnType("integer");

                    b.Property<decimal>("TotalPayment")
                        .HasColumnType("numeric");

                    b.HasKey("ID");

                    b.HasIndex("LoanRequestId");

                    b.ToTable("Loans");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.LoanRequest", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CBU")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("DataUserId")
                        .HasColumnType("uuid");

                    b.Property<decimal>("DownPayment")
                        .HasColumnType("numeric");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<decimal>("LotCost")
                        .HasColumnType("numeric");

                    b.Property<int>("QuotasCount")
                        .HasColumnType("integer");

                    b.Property<int>("StateRequest")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("DataUserId");

                    b.ToTable("LoanRequests");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.Quota", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<decimal>("Amount")
                        .HasColumnType("numeric");

                    b.Property<string>("Createby")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("LoanId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("PayDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PreferenceID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("QuotaNumber")
                        .HasColumnType("integer");

                    b.Property<int>("State")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("LoanId");

                    b.ToTable("Quotas");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.DataGuarantor", b =>
                {
                    b.HasOne("h3_18_proptechback.Domain.LoanRequest", "LoanRequest")
                        .WithMany()
                        .HasForeignKey("LoanRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LoanRequest");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.DocumentsGuarantor", b =>
                {
                    b.HasOne("h3_18_proptechback.Domain.DataGuarantor", "DataGuarantor")
                        .WithMany()
                        .HasForeignKey("DataGuarantorID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DataGuarantor");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.DocumentsUser", b =>
                {
                    b.HasOne("h3_18_proptechback.Domain.DataUser", "DataUser")
                        .WithMany()
                        .HasForeignKey("DataUserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("h3_18_proptechback.Domain.LoanRequest", "LoanRequest")
                        .WithMany()
                        .HasForeignKey("LoanRequestId");

                    b.Navigation("DataUser");

                    b.Navigation("LoanRequest");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.Loan", b =>
                {
                    b.HasOne("h3_18_proptechback.Domain.LoanRequest", "LoanRequest")
                        .WithMany()
                        .HasForeignKey("LoanRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LoanRequest");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.LoanRequest", b =>
                {
                    b.HasOne("h3_18_proptechback.Domain.DataUser", "DataUser")
                        .WithMany()
                        .HasForeignKey("DataUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DataUser");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.Quota", b =>
                {
                    b.HasOne("h3_18_proptechback.Domain.Loan", "Loan")
                        .WithMany("Quotas")
                        .HasForeignKey("LoanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Loan");
                });

            modelBuilder.Entity("h3_18_proptechback.Domain.Loan", b =>
                {
                    b.Navigation("Quotas");
                });
#pragma warning restore 612, 618
        }
    }
}
