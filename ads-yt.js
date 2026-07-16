// yt_ads_blocker.js – chặn request quảng cáo bằng trả về rỗng
$done({ response: { status: 200, headers: {}, body: "{}" } });