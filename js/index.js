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
            // map과 지도 중심점 설정
            const map = new google.maps.Map(
                document.getElementById("map"),
                {
                    zoom: 10.1,
                    center: { lat: 33.381766, lng: 126.582801 },
                }
            );

            const jeju = new google.maps.Marker({
                position: { lat: 33.381766, lng: 126.582801 },
                map: map,
            });

            // 안내창 설정, 클릭이벤트 부여
            for (let i = 0; i < data.length; i++) {
                const marker = new google.maps.Marker({
                    label: parseInt(data[i]["courseNumber"]).toString(),
                    name: data[i]["courseName"],
                    position: { lat: data[i]["startLatitude"], lng: data[i]["startLongitude"] },
                    map: map,
                    length: data[i]["courseLength"],
                    time: data[i]["estimatedTime"],
                });

                marker.addListener('click', () => {
                    const content = '<p class="ollename">' + marker.name + '</p><p class="ollelength">' + marker.length + ' km</p><p class="olletime">약 ' + marker.time + '시간</p>';
                    map.panTo(marker.position);
                    infoWindow.setContent(content);
                    infoWindow.open({
                        anchor: marker,
                        map,
                    });
                })
            }

            // 핫플레이스 표시
            const ollestay = new google.maps.Marker({
                label: '🏡',
                name: '제주올레여행자센터',
                position: { lat: 33.2474043, lng: 126.5587322 },
                map: map,
            });

            const weniv = new google.maps.Marker({
                label: '🐱',
                name: '주식회사 위니브',
                position: { lat: 33.5083269, lng: 126.5410764 },
                map: map,
            });

            const osulloc = new google.maps.Marker({
                label: '🍵',
                name: '오설록 티 뮤지엄',
                position: { lat: 33.3058932, lng: 126.289534 },
                map: map,
            });

            ollestay.addListener('click', () => {
                map.panTo(ollestay.position);
                infoWindow.setContent('<p class="ollename">' + ollestay.name + '</p>');
                infoWindow.open({
                    anchor: ollestay,
                    map,
                });
            })

            weniv.addListener('click', () => {
                map.panTo(weniv.position);
                infoWindow.setContent('<p class="ollename">' + weniv.name + '</p>');
                infoWindow.open({
                    anchor: weniv,
                    map,
                });
            })

            osulloc.addListener('click', () => {
                map.panTo(osulloc.position);
                infoWindow.setContent('<p class="ollename">' + osulloc.name + '</p>');
                infoWindow.open({
                    anchor: osulloc,
                    map,
                });
            })

            // 인사창 설정
            const firstwindow = new google.maps.InfoWindow({
                content: "Hello Stranger!",
            });
            firstwindow.open(map, jeju);
            const infoWindow = new google.maps.InfoWindow();

            // 써클 표식
            const myCity = new google.maps.Circle({
                center: ollestay.position,
                radius: 200,
                strokeColor: "#F26E22",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#F26E22",
                fillOpacity: 0.3,
            });

            myCity.setMap(map);
        });
}

