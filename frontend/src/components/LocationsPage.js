import React from "react";
import Topbar from "./Topbar";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    MarkerF,
} from "@react-google-maps/api";

const LocationsPage = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyB1Lgt0SnhVHCR2avyM08Yz-RpyPKHUZ-0",
    });
    const mapContainerStyle = {
        width: "100vw",
        height: "100vh",
    };
    return (
        <div>
            <Topbar />
            {isLoaded ? (
                <GoogleMap
                    zoom={18}
                    center={{ lat: 30.6158145, lng: -96.3384525 }}
                    mapContainerStyle={mapContainerStyle}
                >
                    {" "}
                    <MarkerF position={{ lat: 30.6158145, lng: -96.3384525 }} />
                    <MarkerF
                        position={{
                            lat: 30.622781452867564,
                            lng: -96.3378815396195,
                        }}
                    />
                    <MarkerF
                        position={{
                            lat: 30.634185830169923,
                            lng: -96.37910064232774,
                        }}
                    />
                    <MarkerF
                        position={{
                            lat: 30.65927772020431,
                            lng: -96.33178889814704,
                        }}
                    />
                </GoogleMap>
            ) : (
                <div className='ui active dimmer'>
                    <div className='ui text loader'>loading...</div>
                </div>
            )}
        </div>
    );
};

export default LocationsPage;
