using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = _context.Activities.Find(request.Activity.Id);
            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            _mapper.Map(request.Activity, activity);

            await _context.SaveChangesAsync();
        }
    }
}