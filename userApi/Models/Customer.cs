using System;
using System.Collections.Generic;

namespace customer.Models
{
    public partial class Customer
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public string AccountId { get; set; } = null!;
        public string AccountType { get; set; } = null!;
        public DateTime? CreateDate { get; set; }
    }
}
