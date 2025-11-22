const express = require("express");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

// Phục vụ file tĩnh (index.html, main.js, style.css)
app.use(express.static(path.join(__dirname, "/")));

// Route fetch HTML từ vbpl.vn
app.get("/get-html", async (req, res) => {
    try {
        const url = "https://vbpl.vn/VBQPPL_UserControls/Publishing_22/pMenuToanVan.aspx?IsVietNamese=True&ItemID=179265";
        const response = await fetch(url);
        const htmlContent = await response.text();
        //load cheerio
        const _loadJS = cheerio.load(htmlContent);
        const result = [];

        _loadJS("li.dieu > a").each((li, el) => {
            const href = _loadJS(el).attr("href") || "";
            const title = _loadJS(el).attr("title") || "";
            const text = _loadJS(el).text().trim() || "";

            result.push({ href, title, text });
        });
        // Lưu vào file JSON
        fs.writeFileSync("data.json", JSON.stringify(result, null, 2), "utf8");


        res.send(htmlContent);

    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi khi fetch HTML");
    }
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
