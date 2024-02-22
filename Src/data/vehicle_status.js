import { View, Text } from 'react-native'
import React from 'react'
import {makeApiRequest} from './url';

export const handleVehicleStatus = async () => {
    try {
      const query = `
        SELECT COUNT(vehicle_no) AS 'Total veh, onroad, offroad, single shift'
        FROM emri.m_vehicle va
        LEFT JOIN wbemri.eme_vehicles ev ON ev.veh_no = va.vehicle_no
        WHERE ev.eme_id = '164442' AND va.is_active = '1'
        
        UNION
        
        SELECT COUNT(vehicle_no) AS 'Onroad'
        FROM emri.m_vehicle va
        LEFT JOIN wbemri.eme_vehicles ev ON ev.veh_no = va.vehicle_no
        WHERE ev.eme_id = '164442' AND va.is_active = '1' AND va.status = '1'
        
        UNION
        
        SELECT COUNT(vehicle_no) AS 'Onroad'
        FROM emri.m_vehicle va
        LEFT JOIN wbemri.eme_vehicles ev ON ev.veh_no = va.vehicle_no
        WHERE ev.eme_id = '164442' AND va.is_active = '1' AND va.status = '3'
        
        UNION
        
        SELECT COUNT(vehicle_no) AS 'Onroad'
        FROM emri.m_vehicle va
        LEFT JOIN wbemri.eme_vehicles ev ON ev.veh_no = va.vehicle_no
        WHERE ev.eme_id = '164442' AND va.is_active = '1' AND va.status = '4'
      `;
  
      const response = await makeApiRequest(query);
  
      // Log the response or perform further actions with the data
      console.log(response);
    } catch (error) {
      console.error('Error fetching vehicle status:', error);
    }
  };