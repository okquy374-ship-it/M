(function () {
    const url = $request.url;
    const match = url.match(/\/video\/(\d+)/);

    if (!match) {
        $done({});
        return;
    }

    const videoId = match[1];
    const apiUrl = `https://www.tikwm.com/api/?url=video/${videoId}&hd=1`;

    $httpClient.get(apiUrl, function (error, response, data) {
        if (error || response.status !== 200) {
            $done({});
            return;
        }

        try {
            const json = JSON.parse(data);
            
            if (json && json.data && json.data.play) {
                const videoUrl = json.data.play;

                $done({
                    status: 302,
                    headers: {
                        'Location': videoUrl,
                        'Content-Type': 'text/plain'
                    }
                });
                return;
            }
        } catch (e) {
            console.log("Lỗi parse JSON API: " + e);
        }
		
        $done({});
    });
})();