using DroneAPI.Domain.Assignments;
using DroneAPI.Domain.Users;
using DroneAPI.Domain.Shared;
using Microsoft.Extensions.Configuration;
using Moq;

public class AssignmentServiceTest
{
    [Fact]
    public async Task GetAllAsync_ShouldReturnAllAssignments()
    {
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var assignment1 = new Assignment("B102","B103", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");
        var assignment2 = new Assignment("C102", "C204", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");

        var assignmentList = new List<Assignment>
        {
            assignment1,
            assignment2
        };

        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(assignmentList);

        //Act

        var result = await assignmentService.GetAllAsync(token);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(assignmentList.Count(), result.Count());
        for (int i = 0; i<assignmentList.Count; i++)
        {
            Assert.Equal(assignmentList[i].Id.AsGuid(), result.ElementAt(i).Id);
            Assert.Equal(assignmentList[i].StartPoint, result.ElementAt(i).StartPoint);
            Assert.Equal(assignmentList[i].EndPoint, result.ElementAt(i).EndPoint);
            Assert.Equal(assignmentList[i].Status.ToString(), result.ElementAt(i).Status);
            Assert.Equal(assignmentList[i].Type.ToString(), result.ElementAt(i).Type);
            Assert.Equal(assignmentList[i].Email, result.ElementAt(i).Email);
            Assert.Equal(assignmentList[i].Name, result.ElementAt(i).Name);
        }
    }

    [Fact]
    public async Task GetAllAsync_WrongRole(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var token = authService.GenerateJwtToken("Campus Manager", "1201354@isep.ipp.pt");

        //Act&Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(() => assignmentService.GetAllAsync(token));
    }

    [Fact]
    public async Task GetAllPendingAsync_ShouldReturnAllPendingAssignments()
    {
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var assignment1 = new Assignment("B102","B103", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");
        var assignment2 = new Assignment("C102", "C204", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");

        var assignmentList = new List<Assignment>
        {
            assignment1,
            assignment2
        };

        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetAllPendingAsync()).ReturnsAsync(assignmentList);

        //Act

        var result = await assignmentService.GetAllPendingAsync(token);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(assignmentList.Count(), result.Count());
        for (int i = 0; i<assignmentList.Count; i++)
        {
            Assert.Equal(assignmentList[i].Id.AsGuid(), result.ElementAt(i).Id);
            Assert.Equal(assignmentList[i].StartPoint, result.ElementAt(i).StartPoint);
            Assert.Equal(assignmentList[i].EndPoint, result.ElementAt(i).EndPoint);
            Assert.Equal(assignmentList[i].Status.ToString(), "Pending");
            Assert.Equal(assignmentList[i].Type.ToString(), result.ElementAt(i).Type);
            Assert.Equal(assignmentList[i].Email, result.ElementAt(i).Email);
            Assert.Equal(assignmentList[i].Name, result.ElementAt(i).Name);
        }
    }

    [Fact]
    public async Task GetAllPendingAsync_WrongRole(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var token = authService.GenerateJwtToken("Campus Manager", "1201354@isep.ipp.pt");

        //Act&Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(() => assignmentService.GetAllPendingAsync(token));
    }

    [Fact]
    public async Task GetAllAcceptedAsync_ShouldReturnAllAcceptedAssignments(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var assignment1 = new Assignment("B102","B103", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");
        assignment1.Accept();
        var assignment2 = new Assignment("C102", "C204", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");
        assignment2.Accept();

        var assignmentList = new List<Assignment>
        {
            assignment1,
            assignment2
        };

        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetAllAcceptedAsync()).ReturnsAsync(assignmentList);

        //Act

        var result = await assignmentService.GetAllAcceptedAsync(token);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(assignmentList.Count(), result.Count());
        for (int i = 0; i<assignmentList.Count; i++)
        {
            Assert.Equal(assignmentList[i].Id.AsGuid(), result.ElementAt(i).Id);
            Assert.Equal(assignmentList[i].StartPoint, result.ElementAt(i).StartPoint);
            Assert.Equal(assignmentList[i].EndPoint, result.ElementAt(i).EndPoint);
            Assert.Equal(assignmentList[i].Status.ToString(), "Accepted");
            Assert.Equal(assignmentList[i].Type.ToString(), result.ElementAt(i).Type);
            Assert.Equal(assignmentList[i].Email, result.ElementAt(i).Email);
            Assert.Equal(assignmentList[i].Name, result.ElementAt(i).Name);
        }
    }

    [Fact]
    public async Task GetAllAcceptedAsync_WrongRole(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var token = authService.GenerateJwtToken("Campus Manager", "1201354@isep.ipp.pt");

        //Act&Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(() => assignmentService.GetAllAcceptedAsync(token));
    }

    [Fact]
    public async Task GetAllRejectedAsync_ShouldReturnAllRejectedAssignments(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var assignment1 = new Assignment("B102","B103", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");
        assignment1.Reject();
        var assignment2 = new Assignment("C102", "C204", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");
        assignment2.Reject();

        var assignmentList = new List<Assignment>
        {
            assignment1,
            assignment2
        };

        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetAllRejectedAsync()).ReturnsAsync(assignmentList);

        //Act

        var result = await assignmentService.GetAllRejectedAsync(token);

        //Assert
        Assert.NotNull(result);
        Assert.Equal(assignmentList.Count(), result.Count());
        for (int i = 0; i<assignmentList.Count; i++)
        {
            Assert.Equal(assignmentList[i].Id.AsGuid(), result.ElementAt(i).Id);
            Assert.Equal(assignmentList[i].StartPoint, result.ElementAt(i).StartPoint);
            Assert.Equal(assignmentList[i].EndPoint, result.ElementAt(i).EndPoint);
            Assert.Equal(assignmentList[i].Status.ToString(), "Rejected");
            Assert.Equal(assignmentList[i].Type.ToString(), result.ElementAt(i).Type);
            Assert.Equal(assignmentList[i].Email, result.ElementAt(i).Email);
            Assert.Equal(assignmentList[i].Name, result.ElementAt(i).Name);
        }
    }

    [Fact]
    public async Task GetAllRejectedAsync_WrongRole(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var token = authService.GenerateJwtToken("Campus Manager", "1201354@isep.ipp.pt");

        //Act&Assert
        await Assert.ThrowsAsync<UnauthorizedAccessException>(() => assignmentService.GetAllAcceptedAsync(token));
    }

    [Fact]
    public async Task CreateAssignment(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetAllAsync()).ReturnsAsync(new List<Assignment>());

        var count = 1 + (await assignmentService.GetAllAsync(token)).Count();

        assignmentRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Assignment>())).ReturnsAsync((Assignment t) => t); 

        //Act

        var creatingAssignmentDto = new CreatingAssignmentDto ("B102", "B103","Delivery", token);

        var result = await assignmentService.AddAsync(creatingAssignmentDto);

        //Assert
        Assert.NotNull(result);
        Assert.IsType<AssignmentDto>(result);
        Assert.Equal(result.StartPoint, creatingAssignmentDto.StartPoint);
        Assert.Equal(result.EndPoint, creatingAssignmentDto.EndPoint);
        Assert.Equal(result.Type, creatingAssignmentDto.Type);
        Assert.Equal(result.Email, "1201354@isep.ipp.pt");

        assignmentRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Assignment>()), Times.Once);
        unitOfWorkMock.Verify(x => x.CommitAsync(), Times.Once);
    }

    [Fact]
    public async Task UpdateAccept(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var assignment1 = new Assignment("B102","B103", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");


        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        
        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<AssignmentId>())).ReturnsAsync(assignment1);

        unitOfWorkMock.Setup(x => x.CommitAsync()).ReturnsAsync(1);

        //Act

        var result = await assignmentService.UpdateStatusAsync("11111111-1111-1111-1aa1-111111111111", "a", token);

        //Assert
        Assert.NotNull(result);
        Assert.IsType<AssignmentDto>(result);
        Assert.Equal(result.Status, "Accepted");
    }
    
    [Fact]
    public async Task UpdateReject(){
        //Arrange
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var iUserRepositoryMock = new Mock<IUserRepository>();
        var assignmentRepositoryMock = new Mock<IAssignmentRepository>();
        var iConf = new Mock<IConfiguration>();

        var userServiceMock = new UserService(unitOfWorkMock.Object, iUserRepositoryMock.Object, iConf.Object);

        iConf.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        iConf.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var authService = new AuthService(iConf.Object, userServiceMock);

        var assignmentService = new AssignmentService(unitOfWorkMock.Object, assignmentRepositoryMock.Object, userServiceMock);

        var assignment1 = new Assignment("B102","B103", AssignmentType.Delivery, "1201354@isep.ipp.pt", "John Doe");


        var token = authService.GenerateJwtToken("Task Manager", "1201354@isep.ipp.pt");

        
        //Mock Behavior
        assignmentRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<AssignmentId>())).ReturnsAsync(assignment1);

        unitOfWorkMock.Setup(x => x.CommitAsync()).ReturnsAsync(1);

        //Act

        var result = await assignmentService.UpdateStatusAsync("11111111-1111-1111-1aa1-111111111111", "r", token);

        //Assert
        Assert.NotNull(result);
        Assert.IsType<AssignmentDto>(result);
        Assert.Equal(result.Status, "Rejected");
    }
}