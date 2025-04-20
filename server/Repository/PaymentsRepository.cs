

using server.Data;
using server.Interface;
using server.Models;
using server.Repository;

namespace Server.Repository;

public class PaymentsRepository : GenericRepository<Payment>, IPaymentsRepository
{
    private readonly MBSDbContext _context;
    public PaymentsRepository(MBSDbContext context) : base(context)
    {
        _context = context;
    }
}

