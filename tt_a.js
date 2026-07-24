let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        const cleanAweme = (item) => {
            if (item && item.video) {
                if (item.video.play_addr && item.video.play_addr.url_list) {
                    item.video.download_addr = item.video.play_addr;
                }
                
                if (item.video.download_suffix_logo_addr) {
                    delete item.video.download_suffix_logo_addr;
                }
            }
            return item;
        };

        if (obj.aweme_list && Array.isArray(obj.aweme_list)) {
            obj.aweme_list = obj.aweme_list.map(cleanAweme);
        } else if (obj.aweme_detail) {
            obj.aweme_detail = cleanAweme(obj.aweme_detail);
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}