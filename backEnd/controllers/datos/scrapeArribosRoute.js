import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const scrapeArribosRouter = express.Router();

// GET /scrape-arribos/:airportCode
// Example: /scrape-arribos/mdz
scrapeArribosRouter.get("/:airportCode", async (req, res, next) => {
  try {
    const airportCode = req.params.airportCode?.toUpperCase() || "MDZ";
    // 1. GET the page to get VIEWSTATE and EVENTVALIDATION
    const getResp = await axios.get(
      "http://www.tams.com.ar/organismos/vuelos.aspx"
    );
    const $ = cheerio.load(getResp.data);

    const viewState = $('input[name="__VIEWSTATE"]').val();
    const eventValidation = $('input[name="__EVENTVALIDATION"]').val();
    const viewStateGen = $('input[name="__VIEWSTATEGENERATOR"]').val();

    // Check for missing fields
    if (!viewState || !eventValidation || !viewStateGen) {
      return res.status(500).json({ error: "Could not extract hidden fields" });
    }

    // Forward cookies from GET to POST
    const cookies = getResp.headers["set-cookie"]?.join("; ") || "";

    // 2. POST with the filters for Arrivals, airport, +4 hours
    const formData = new URLSearchParams();
    formData.append("__VIEWSTATE", viewState);
    formData.append("__EVENTVALIDATION", eventValidation);
    formData.append("__VIEWSTATEGENERATOR", viewStateGen);
    formData.append("ddlMovTp", "A"); // "A" for ARRIBOS (arrivals)
    formData.append("ddlAeropuerto", airportCode); // e.g., "MDZ" for Mendoza
    formData.append("ddlSector", "-1"); // All sectors
    formData.append("ddlAerolinea", "-1"); // All airlines
    formData.append("ddlAterrizados", "TODOS"); // All
    formData.append("ddlVentanaH", "4"); // +4 hours
    formData.append("btnBuscar", "Buscar");

    const postResp = await axios.post(
      "http://www.tams.com.ar/organismos/vuelos.aspx",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: "http://www.tams.com.ar/organismos/vuelos.aspx",
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

    // 3. Parse the resulting HTML for the table rows
    const $$ = cheerio.load(postResp.data);
    const flights = [];
    $$("#dgGrillaA tr").each((i, row) => {
      if (i === 0) return; // skip header
      const cells = $$(row).find("td");
      if (cells.length < 16) return; // skip non-data rows
      flights.push({
        airline: $$(cells[0]).text().trim(),
        flight: $$(cells[1]).text().trim(),
        sta: $$(cells[2]).text().trim(),
        matricula: $$(cells[3]).text().trim(),
        posicion: $$(cells[4]).text().trim(),
        eta: $$(cells[5]).text().trim(),
        ata: $$(cells[6]).text().trim(),
        terminal: $$(cells[7]).text().trim(),
        sector: $$(cells[8]).text().trim(),
        cinta: $$(cells[9]).text().trim(),
        lf: $$(cells[10]).text().trim(),
        origen: $$(cells[11]).text().trim(),
        via: $$(cells[12]).text().trim(),
        remark: $$(cells[13]).text().trim(),
        sanidad: $$(cells[14]).text().trim(),
        pax: $$(cells[15]).text().trim(),
      });
    });

    res.json(flights);
  } catch (error) {
    next(error);
  }
});

export default scrapeArribosRouter;
