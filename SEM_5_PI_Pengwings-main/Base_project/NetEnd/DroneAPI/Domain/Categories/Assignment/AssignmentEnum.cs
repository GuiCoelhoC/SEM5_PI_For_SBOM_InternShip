using System;
using DroneAPI.Domain.Shared;

namespace DroneAPI.Domain.Assignments
{
    public enum AssignmentStatus
    {
        Pending,
        Accepted,
        Rejected,
    }

    public enum AssignmentType
    {
        Delivery,
        Disinfection,
        Surveillance,
    }


}
