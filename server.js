const express = require("express");
const path = require("path");

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
        res.send(htmlContent);
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi khi fetch HTML");
    }
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
