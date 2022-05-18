using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using customer.Models;

namespace customer.Data
{
    public partial class customerContext : DbContext
    {
        public customerContext()
        {
        }

        public customerContext(DbContextOptions<customerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customers");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AccountId)
                    .HasMaxLength(500)
                    .HasColumnName("accountId")
                    .UseCollation("utf8_general_ci")
                    .HasCharSet("utf8mb3");

                entity.Property(e => e.AccountType)
                    .HasMaxLength(500)
                    .HasColumnName("accountType")
                    .UseCollation("utf8_general_ci")
                    .HasCharSet("utf8mb3");

                entity.Property(e => e.CreateDate)
                    .HasColumnType("datetime")
                    .HasColumnName("createDate");

                entity.Property(e => e.FullName)
                    .HasMaxLength(500)
                    .HasColumnName("fullName")
                    .UseCollation("utf8_general_ci")
                    .HasCharSet("utf8mb3");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
