using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interface;
using server.Models;

namespace server.Repository;

public class ReviewsRepository : GenericRepository<Review>, IReviewsRepository {
    private readonly MBSDbContext _context;
    public ReviewsRepository(MBSDbContext context) : base(context) {
        _context = context;
    }
}