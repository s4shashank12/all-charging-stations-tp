import { RestClientBuilder } from "./rest-client";
import { v4 as uuidv4 } from 'uuid';

export async function getAllLocations() {
    const data: any = await RestClientBuilder
        .instance()
        .withBaseUrl('https://ezcharge.tatapower.com')
        .withHeader('Authorization', 'Basic NDUzNDY5VFBMOnNhZG1wd2Q=')
        .build()
        .post('/HobsIntegration/syncRequestHandler',
        {
            "userid": "8339042070",
            "latitude": "",
            "longitude": "",
            "profileid": "PUBLIC",
            "profileType": "PUBLIC",
            "filter": {
                "radius": "",
                "connector_type": "ALL",
                "connector_standard": [],
                "availability": "",
                "free_chargers": "",
                "amenities": [],
                "tariff_name": []
            }
        },
        {
            transid: uuidv4(),
            service: 'GET_CHARGING_STATIONS_ALL'
        })

    return data.chargingStations
}