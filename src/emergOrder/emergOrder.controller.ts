import { 
    Body, 
    Controller, 
    Get, 
    Post 
} from "@nestjs/common";

import { EmergencyOrderService } from "./emergOrder.service";




@Controller('emergOrder')
export class EmergencyOrderController{
    constructor(private readonly emergencyOrderService: EmergencyOrderService){}
     
    @Post()
    addEmergencyOrder(
        @Body('userId') emergencyUserId: string,
        @Body('doctorId') emergencyDoctorId: string,
        @Body('hospitalId') emergencyHospitalId: string, 
    ){
        const generatedId = this.emergencyOrderService.insertEO(
            emergencyUserId,
            emergencyDoctorId,
            emergencyHospitalId,
        );
        return {id: generatedId}
    }

    @Get()
    getAllEmergencyOrders(){
        return this.emergencyOrderService.getEmergencyO();
    }
}