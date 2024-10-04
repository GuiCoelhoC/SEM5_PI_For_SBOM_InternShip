using System;
using DroneAPI.Domain.Shared;
using Newtonsoft.Json;

namespace DroneAPI.Domain.Assignments
{

    public class AssignmentId : EntityId
    {
        [JsonConstructor]
        public AssignmentId(Guid value) : base(value)
        {
        }

        public AssignmentId(string value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }

        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}