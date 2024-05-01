import { RestClientBuilder } from "./rest-client";
import { v4 as uuidv4 } from 'uuid';

export async function getStationDetails(id: string) {
    const data: any = await RestClientBuilder
        .instance()
        .withBaseUrl('https://ezcharge.tatapower.com')
        .withHeaders({
            'Sessionid': '929f2ec2-7b9d-4637-a522-d51445d24f62',
            'Authorization': 'da9d74fb-666f-4bf2-aebf-c14d39e8e772'
        })
        .build()
        .post('/HobsIntegration/syncRequestHandler',
            {
                "locationid": id,
                "userid": "8339042070",
                "profileid": "PUBLIC",
                "profileType": "PUBLIC"
            },
            {
                transid: uuidv4(),
                service: 'GET_CHARGE_STATION_DETAILS'
            })

    return data.StationDetails[0].location
}