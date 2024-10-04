namespace DroneAPI.Domain.Assignments
{

    public class CreatingAssignmentDto
    {
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public string Type { get; set; }
        public string Token { get; set; }
        public CreatingAssignmentDto(string startPoint, string endPoint, string type,string token)
        {
            this.StartPoint = startPoint;
            this.EndPoint = endPoint;
            this.Type = type;
            this.Token = token;
        }
    }
}