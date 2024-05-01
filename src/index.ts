import { getAllLocations } from "./get-all-locations";
import { getStationDetails } from "./get-station-details";
import fs from 'fs';

async function fetch() {
    const locations = []
    const stationsData = await getAllLocations()
    for (const station of stationsData) {
        const details = await getStationDetails(station.station_code)
        locations.push(details)
    }

    fs.writeFileSync('file.json', JSON.stringify(locations));
}

fetch()