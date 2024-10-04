using Xunit;
using DroneAPI.Domain.Assignments;

public class AssignmentTests
{
    [Fact]
    public void Assignment_WithValidStartAndEndPoints_CreatesAssignment()
    {
        // Arrange
        string startPoint = "A101";
        string endPoint = "B102";
        AssignmentType type = AssignmentType.Delivery;
        string email = "test@example.com";
        string name = "John Doe";

        // Act
        var assignment = new Assignment(startPoint, endPoint, type, email, name);

        // Assert
        Assert.NotNull(assignment);
    }

    [Fact]
    public void Assignment_CreatesAssigent_Gets()
    {
        // Arrange
        string startPoint = "A";
        string endPoint = "B";
        AssignmentType type = AssignmentType.Delivery;
        string email = "test@example.com";
        string name = "John Doe";

        // Act
        var assignment = new Assignment(startPoint, endPoint, type, email, name);

        // Assert
        Assert.Equal(startPoint, assignment.StartPoint);
        Assert.Equal(endPoint, assignment.EndPoint);
        Assert.Equal(AssignmentStatus.Pending, assignment.Status);
        Assert.Equal(type, assignment.Type);
        Assert.Equal(email, assignment.Email);
        Assert.Equal(name, assignment.Name);
    }

    [Fact]
    public void Assignment_WithEmptyStartPoint_ThrowsArgumentException()
    {
        // Arrange
        string startPoint = "";
        string endPoint = "B";
        AssignmentType type = AssignmentType.Delivery;
        string email = "test@example.com";
        string name = "John Doe";

        // Act & Assert
        Assert.Throws<ArgumentException>(() => new Assignment(startPoint, endPoint, type, email, name));
    }

    [Fact]
    public void Assignment_WithEmptyEndPoint_ThrowsArgumentException()
    {
        // Arrange
        string startPoint = "A";
        string endPoint = "";
        AssignmentType type = AssignmentType.Delivery;
        string email = "test@example.com";
        string name = "John Doe";

        // Act & Assert
        Assert.Throws<ArgumentException>(() => new Assignment(startPoint, endPoint, type, email, name));
    }

    [Fact]
    public void Accept_UpdatesAssignmentStatusToAccepted()
    {
        // Arrange
        var assignment = new Assignment("A", "B", AssignmentType.Delivery, "test@example.com", "John Doe");

        // Act
        assignment.Accept();

        // Assert
        Assert.Equal(AssignmentStatus.Accepted, assignment.Status);
    }

    [Fact]
    public void Reject_UpdatesAssignmentStatusToRejected()
    {
        // Arrange
        var assignment = new Assignment("A", "B", AssignmentType.Delivery, "test@example.com", "John Doe");

        // Act
        assignment.Reject();

        // Assert
        Assert.Equal(AssignmentStatus.Rejected, assignment.Status);
    }
}