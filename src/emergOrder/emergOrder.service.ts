import { Injectable } from "@nestjs/common";
import { EmergencyOrderDTO } from "./emergOrder.dto";

@Injectable()
export class EmergencyOrderService{
    private emergencyOrders: EmergencyOrderDTO[] = [];

    insertEO(userId: string, doctorId: string, hospitalId: string){
        const emergencyOId = Math.random().toString();
        const emergencyO = new EmergencyOrderDTO();
        this.emergencyOrders.push(emergencyO);
        return emergencyOId;
    }

    getEmergencyO(){
        return [...this.emergencyOrders];
    }
}