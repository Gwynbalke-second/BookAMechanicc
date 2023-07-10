using BookAMechanicc.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BookAMechanicc.Data
{
    public class ApplicationDbContext:DbContext
    {
        private readonly IConfiguration _configuration;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, IConfiguration configuration) : base(options) {
            _configuration = configuration;
        }

        public virtual DbSet<tbl_admin> tbl_admin { get; set; }
        public virtual DbSet<tbl_mechanic> tbl_mechanic { get; set; }
        public virtual DbSet<tbl_customer> tbl_customer { get; set; }
        public virtual DbSet<tbl_order> tbl_order { get; set; }
        public virtual DbSet<tbl_completed> tbl_completed { get; set; }
        public virtual DbSet<tbl_cancel> tbl_cancel { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("CustomerCS"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tbl_admin>().HasNoKey();
        }
    }
}
