// main.js
async function main() {
    try {
        // Gọi route backend /get-html
        const res = await fetch("/get-html");

        // Kiểm tra xem backend trả về thành công không
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        // Lấy HTML dạng text
        const htmlContent = await res.text();

        // Chèn HTML vào div#content
        document.getElementById("content").innerHTML = htmlContent;
    } catch (err) {
        console.error("Lỗi khi load HTML:", err);
        document.getElementById("content").innerText = "Lỗi khi load HTML từ server.";
    }
}

// Gọi hàm main khi load trang
main();
