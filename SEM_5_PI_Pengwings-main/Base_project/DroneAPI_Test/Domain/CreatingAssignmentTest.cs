using DroneAPI.Domain.Assignments;

public class CreatingAssignmentTest
{
    [Fact]
    public void TestCreatingAssignmentDTO()
    {
        string start = "sala1";
        string end = "sala2";
        string type = "Delivery";
        string token = "user";

        CreatingAssignmentDto assignmentDto = new CreatingAssignmentDto(start, end, type, token);

        Assert.Equal(start, assignmentDto.StartPoint);
        Assert.Equal(end, assignmentDto.EndPoint);
        Assert.Equal(type, assignmentDto.Type);
        Assert.Equal(token, assignmentDto.Token);

    }
}