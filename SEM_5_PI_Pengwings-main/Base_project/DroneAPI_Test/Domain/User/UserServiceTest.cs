using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DroneAPI.Domain.Shared;
using DroneAPI.Domain.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

public class UserServiceTest
{

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllUsers()
    {
        // Arrang
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockUserRepository = new Mock<IUserRepository>();
        var mockConfig = new Mock<IConfiguration>();

        var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockConfig.Object);

        var userused = new User
            (
                FirstName: "John",
                LastName: "Doe",
                Email: "test@isep.ipp.pt",
                PhoneNumber: "123456789",
                Password: "tTesSt(123)",
                Role: "Administrator",
                Status: "Accepted" // change later
            );
        var userList = new List<User>
        {
            userused,
        };

        var expected = new List<User>
        {
            new User
            (
                FirstName: userused.FirstName,
                LastName: userused.LastName,
                Email: userused.Email,
                PhoneNumber: userused.PhoneNumber,
                Password: userused.Password,
                Role: userused.Role,
                Status: userused.Status.ToString(),
                Active: true
            )
        };

        mockUserRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(userList);

        // Act
        var result = await userService.GetAllAsync();

        // Assert
        Assert.Equal(expected.Count, result.Count);

        for (int i = 0; i < expected.Count; i++)
        {
            Assert.Equal(expected[i].FirstName, result[i].FirstName);
            Assert.Equal(expected[i].LastName, result[i].LastName);
            Assert.Equal(expected[i].Email, result[i].Email);
            Assert.Equal(expected[i].PhoneNumber, result[i].PhoneNumber);
            Assert.Equal(expected[i].Password, result[i].Password);
            Assert.Equal(expected[i].Role, result[i].Role);
            Assert.Equal(expected[i].Status, result[i].Status);
        }
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnEmptyList()
    {
        // Arrang
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockUserRepository = new Mock<IUserRepository>();
        var mockConfig = new Mock<IConfiguration>();

        var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockConfig.Object);

        var userused = new User
                    (
                        FirstName: "John",
                        LastName: "Doe",
                        Email: "test@isep.ipp.pt",
                        PhoneNumber: "123456789",
                        Password: "tTesSt(123)",
                        Role: "Administrator",
                        Status: "Accepted" // change later
                    );
        var userList = new List<User>();

        var expected = new List<User>();

        mockUserRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(userList);

        // Act
        var result = await userService.GetAllAsync();

        // Assert
        Assert.Equal(expected.Count, result.Count);
    }

    [Fact]
    public async Task GetByIdAsync_IdExists_ShouldReturnUser()
    {
        // Arrang
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockUserRepository = new Mock<IUserRepository>();
        var mockConfig = new Mock<IConfiguration>();

        var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockConfig.Object);

        var userused = new User
            (
                FirstName: "John",
                LastName: "Doe",
                Email: "test@isep.ipp.pt",
                PhoneNumber: "123456789",
                Password: "tTesSt(123)",
                Role: "Administrator",
                Status: "Accepted" // change later
            );

        var userId = new UserId(Guid.NewGuid());
        var expectedDto = new UserDto
        {
            Id = userId.AsGuid(),
            FirstName = userused.FirstName,
            LastName = userused.LastName,
            Email = userused.Email,
            PhoneNumber = userused.PhoneNumber,
            Password = userused.Password,
            Role = userused.Role,
            Status = userused.Status,
        };

        mockUserRepository.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync(userused);

        // Act
        var result = await userService.GetByIdAsync(userId);

        // Assert
        Assert.Equal(expectedDto.FirstName, result.FirstName);
        Assert.Equal(expectedDto.LastName, result.LastName);
        Assert.Equal(expectedDto.Email, result.Email);
        Assert.Equal(expectedDto.PhoneNumber, result.PhoneNumber);
        Assert.Equal(expectedDto.Password, result.Password);
        Assert.Equal(expectedDto.Role, result.Role);
        Assert.Equal(expectedDto.Status, result.Status);
    }

    [Fact]
    public async Task GetByIdAsync_IdDoesNotExist_ShouldReturnNull()
    {
        // Arrang
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockUserRepository = new Mock<IUserRepository>();
        var mockConfig = new Mock<IConfiguration>();

        var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockConfig.Object);

        var userused = new User
            (
                FirstName: "John",
                LastName: "Doe",
                Email: "test@isep.ipp.pt",
                PhoneNumber: "123456789",
                Password: "tTesSt(123)",
                Role: "Administrator",
                Status: "Accepted" // change later
            );

        var userId = new UserId(Guid.NewGuid());

        mockUserRepository.Setup(repo => repo.GetByIdAsync(userId)).ReturnsAsync((User)null);

        // Act
        var result = await userService.GetByIdAsync(userId);

        // Assert
        Assert.Null(result);
    }
    [Fact]
    public async Task AddAsync_ShouldCreateUser()
    {
        // Arrang
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockUserRepository = new Mock<IUserRepository>();
        var mockConfig = new Mock<IConfiguration>();

        var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockConfig.Object);
        var userused = new User
            (
                FirstName: "John",
                LastName: "Doe",
                Email: "test@isep.ipp.pt",
                PhoneNumber: "123456789",
                Password: "tTesSt(123)",
                Role: "Administrator",
                Status: "Accepted" // change later
            );
        var CreatingUser = new CreatingUserDto(
            userused.FirstName,
            userused.LastName,
            userused.Email,
            userused.PhoneNumber,
            userused.Role,
            userused.Password
        );

        var expectedDto = new UserDto
        {
            Id = userused.Id.AsGuid(),
            FirstName = userused.FirstName,
            LastName = userused.LastName,
            Email = userused.Email,
            PhoneNumber = userused.PhoneNumber,
            Password = userused.Password,
            Role = userused.Role,
            Status = userused.Status,
        };

        mockUserRepository.Setup(repo => repo.AddAsync(userused)).ReturnsAsync(userused);

        // Act
        var result = await userService.AddAsync(CreatingUser);

        // Assert
        Assert.Equal(expectedDto.FirstName, result.FirstName);
        Assert.Equal(expectedDto.LastName, result.LastName);
        Assert.Equal(expectedDto.Email, result.Email);
        Assert.Equal(expectedDto.PhoneNumber, result.PhoneNumber);
        Assert.Equal(expectedDto.Password, result.Password);
        Assert.Equal(expectedDto.Role, result.Role);
    }

    [Fact]
    public async Task UpdateByTokenAsync_ValidData_ShouldUpdateUser()
    {
        // Arrang
        var mockUnitOfWork = new Mock<IUnitOfWork>();
        var mockUserRepository = new Mock<IUserRepository>();
        var mockConfig = new Mock<IConfiguration>();

        mockConfig.SetupGet(c => c["Jwt:Key"]).Returns("This is a key used to encrypt and decrypt the token signature and must be at least 128 characters long");
        mockConfig.SetupGet(c => c["Jwt:Issuer"]).Returns("This is a issuer");

        var userService = new UserService(mockUnitOfWork.Object, mockUserRepository.Object, mockConfig.Object);
        var userused = new User
            (
                FirstName: "John",
                LastName: "Doe",
                Email: "test@isep.ipp.pt",
                PhoneNumber: "123456789",
                Password: "tTesSt(123)",
                Role: "Administrator",
                Status: "Accepted" // change later
            );
        var authService = new AuthService(mockConfig.Object, userService);
        var token = authService.GenerateJwtToken("Task Manager", "test@isep.ipp.pt");

        var userId = new UserId(Guid.NewGuid());

        var userDto = new UserDto
        {
            Id = userId.AsGuid(),
            FirstName = "Joe",
            LastName = "Dohn",
            Email = userused.Email,
            PhoneNumber = userused.PhoneNumber,
            Password = userused.Password,
            Role = userused.Role,
            Status = userused.Status,
        };

        var expectedDto = new UserDto
        {
            Id = userused.Id.AsGuid(),
            FirstName = "Joe",
            LastName = "Dohn",
            Email = userused.Email,
            PhoneNumber = userused.PhoneNumber,
            Password = userused.Password,
            Role = userused.Role,
            Status = userused.Status,
        };

        var userList = new List<User>
        {
            userused,
        };

        //GetAllAsync
        mockUserRepository.Setup(repo => repo.GetAllAsync()).ReturnsAsync(userList);

        // Act
        var result = await userService.UpdateByTokenAsync(token, userDto);
        var results = result.Value;
        // Assert
        Assert.Equal(expectedDto.Id, results.Id);
        Assert.Equal(expectedDto.FirstName, results.FirstName);
        Assert.Equal(expectedDto.LastName, results.LastName);
        Assert.Equal(expectedDto.Email, results.Email);
        Assert.Equal(expectedDto.PhoneNumber, results.PhoneNumber);
        Assert.Equal(expectedDto.Password, results.Password);
        Assert.Equal(expectedDto.Role, results.Role);
    }

}