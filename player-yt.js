// yt_player_mod.js – phiên bản sửa lỗi, chỉ xoá trường quảng cáo
let body = $response.body;
if (body) {
    try {
        let obj = JSON.parse(body);
        // Xoá an toàn, chỉ xoá nếu tồn tại
        if (obj.adPlacements) obj.adPlacements = [];
        if (obj.playerAds) obj.playerAds = [];
        if (obj.overlay) delete obj.overlay;
        if (obj.videoDetails && obj.videoDetails.adParams) obj.videoDetails.adParams = null;
        if (obj.attestation) delete obj.attestation;
        // Không chạm vào các trường khác
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // Nếu lỗi parse, trả về nguyên bản để không gián đoạn
        $done({ body: body });
    }
} else {
    $done({});
}