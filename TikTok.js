let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        if (obj.aweme_list) {
            for (let video of obj.aweme_list) {
                if (video.video && video.video.download_addr) {
                    let playUrlList = video.video.play_addr.url_list;
                    if (playUrlList && playUrlList.length > 0) {
                        video.video.download_addr.url_list = playUrlList;
                    }
                }
            }
        } else if (obj.aweme_detail && obj.aweme_detail.video) {
            let detailVideo = obj.aweme_detail.video;
            if (detailVideo.download_addr && detailVideo.play_addr) {
                detailVideo.download_addr.url_list = detailVideo.play_addr.url_list;
            }
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}