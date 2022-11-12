function initMap() {
    // JSON 데이터 가져오기
    fetch(
        "https://open.jejudatahub.net/api/proxy/1Daaa177batDba8b8t711D17D18atDa7/ce26bt11oob2b1tjo271111b6pttp1t2?limit=100"
    )
        .then(r => r.json())
        .then(r => {
            data = r.data;
        })
        .then(() => {
            const ollestay = { lat: 33.2474043, lng: 126.5587322 };
            const map = new google.maps.Map(
                document.getElementById("map"),
                {
                    zoom: 10,
                    center: ollestay,
                }
            );

            new google.maps.Marker({
                position: ollestay,
                map: map,
            });

            for (let i = 0; i < data.length; i++) {
                const marker = new google.maps.Marker({
                    label: data[i]["courseNumber"],
                    name: data[i]["courseName"],
                    position: { lat: data[i]["startLatitude"], lng: data[i]["startLongitude"] },
                    map: map,
                });

                const infoWindow = new google.maps.InfoWindow();

                marker.addListener('click', () => {
                    map.panTo(marker.position);
                    infoWindow.setContent(marker.name);
                    infoWindow.open({
                        anchor: marker,
                        map,
                    });
                })
            }

            const infowindow = new google.maps.InfoWindow({
                content: "Hello <br> World!",
            });
            infowindow.open(map, marker2);
            
            // data = [
            //     {
            //         "courseNumber": "1코스",
            //         "courseName": "시흥-광치기 올레",
            //         "wheelchairCourseFlag": true,
            //         "startPoint": "시흥초등학교",
            //         "startLatitude": 33.479715140000000,
            //         "startLongitude": 126.895649400000000,
            //         "endPoint": "광치기해변",
            //         "endLatitude": 33.452392540000000,
            //         "endLongitude": 126.924704100000000,
            //         "courseLength": 15,
            //         "estimatedTime": "4~5"
            //       },
            // ]
        });
}