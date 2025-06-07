
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : BaseApiController
{
    // api/activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new List.Query());
    }

    // api/activities/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
    {
        await Mediator.Send(new Create.Command { Activity = activity });
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity)
    {
        if (id != activity.Id)
        {
            return BadRequest("Activity ID mismatch");
        }
        await Mediator.Send(new Edit.Command { Activity = activity });
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new Delete.Command { Id = id });
        return Ok();
    }
}