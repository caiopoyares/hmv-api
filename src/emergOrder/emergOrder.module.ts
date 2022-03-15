import { Module } from "@nestjs/common";
import { EmergencyOrderController } from "./emergOrder.controller";
import { EmergencyOrderService } from "./emergOrder.service";

@Module({
    controllers: [EmergencyOrderController],
    providers: [EmergencyOrderService],
}) 
export class EmergencyOrderModule {}